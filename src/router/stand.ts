import { createRouter, createWebHashHistory, createWebHistory, RouteLocation, RouteRecordRaw } from "vue-router";
import { read } from "@/utils/storage";
import { Component, App, toRaw } from "vue";
import { findTreeItemById } from "@/utils/common";
import { getFileNameFromPath } from "@/utils/common/file";
import { useKeepAliveStore } from "@/store/keep-alive";
import { MenuOutputDTO, MenuType } from "@/api/sys/menu/types";
import TopLeft from "@/layouts/TopLeft.vue";

type ModuleRoute = { default: RouteRecordRaw[] }
/**
 * glob: () => import('xxx')
 * globEager: import * as glob_xxx from 'xxx'
 *    vue文件导出的是default, 因此要传给vue-router：glob_xxx.default
 */
const viewModules = import.meta.glob<{ default: Component }>("../views/**/*.vue", { eager: true });

/**
 * 公开路由动态引入
 */
const publicImportRoutes = import.meta.glob<ModuleRoute>("./public/**/*.ts", { eager: true });
/**
 * 基于Layout的权限路由动态引入
 */
const containerImportRoutes = import.meta.glob<ModuleRoute>("./container/**/*.ts", { eager: true });

const publicModuleRoutes: RouteRecordRaw[] = [
  {
    path: "/app/login",
    name: "login",
    component: routeToView("/app/login")
  }
];
const moduleKeys = Object.keys(publicImportRoutes);
for (const key of moduleKeys) {
  if (publicImportRoutes?.[key]) {
    Array.prototype.push.apply(publicModuleRoutes, publicImportRoutes?.[key].default);
  }
}


const containerRoutes: RouteRecordRaw[] = [];
const keys = Object.keys(containerImportRoutes);
for (const key of keys) {
  if (containerImportRoutes?.[key]) {
    Array.prototype.push.apply(containerRoutes, containerImportRoutes?.[key].default);
  }
}




/**
 * 路由映射视图文件
 * @param route
 */
export function routeToView(route: string) {
  if (!viewModules[`../views${route}.vue`]) {
    console.log("err", route);
  }
  return viewModules[`../views${route}.vue`].default // if globEager
  // return viewModules[`../views${route}.vue`]; // if glob
}


const layoutRoute: RouteRecordRaw = {
  path: "/home",
  name: "main",
  component: TopLeft,
  children: containerRoutes
};

console.log("create router before");

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: publicModuleRoutes
});

console.log("create router after");

export {
  router
};

export function isReady() {
  return router.isReady();
}

console.log("create router beforeEach before");


// 登录检测
router.beforeEach((to, from) => {
  const publicRouteNameList = new Set(publicModuleRoutes.map(it => it.name))
  if (to.name !== "login" && !publicRouteNameList.has(to.name!)) {
    const isLogin = read("isLogin");
    if (!isLogin) {
      return {
        name: "login",
        query: {
          redirect: to.fullPath
        }
      };
    }
  }
  console.log('to route-----------', to);
  if (!to.matched?.length) {
    return {
      name: 'main'
    }
  }
  return true;
});

console.log("create router beforeEach after");


/**
 * 安装初始路由
 */
export function setupRouter(app: App, menuOptions: MenuOutputDTO[]) {
  installLayoutContentRoute(menuOptions);
  app.use(router);
}

const removeRouteHandles: Function[] = [];

/**
 * 动态导入路由
 */
export function installLayoutContentRoute(menuOptions: MenuOutputDTO[]) {
  if (!menuOptions || menuOptions.length === 0) {
    return;
  }
  transMenuToRoute(menuOptions);
  // 登录后, 新增重定向路由
  const redirectHandle = router.addRoute({ path: "/", redirect: "/home" });
  removeRouteHandles.push(redirectHandle);
  const layoutHandle = router.addRoute(layoutRoute);
  removeRouteHandles.push(layoutHandle);


  const routes = router.getRoutes();
  const keepAliveNames = routes.filter(it => !!it.meta.keepAlive).map(it => it.meta.componentName);
  const store = useKeepAliveStore();
  store.init(keepAliveNames);

  console.log("after install routes", routes);
}


export function uninstallLayoutContentRoute() {
  while (removeRouteHandles && removeRouteHandles.length > 0) {
    const handle = removeRouteHandles.pop();
    if (handle) {
      handle();
    }
  }

}

function transMenuToRoute(options: MenuOutputDTO[]) {
  for (let menuOption of options) {
    if ([ MenuType.Page, MenuType.Tab ].includes(menuOption.type)) {
      let parentNode: MenuOutputDTO | undefined = menuOption;
      // 找不到图标就找上层 直到根节点为止
      while (parentNode && !parentNode.meta.icon) {
        parentNode = findTreeItemById(options, "id", parentNode.pid);
      }

      let icon = parentNode?.meta.icon || undefined;

      const child: RouteRecordRaw = {
        path: menuOption.path,
        name: menuOption.name,
        component: routeToView(menuOption.component),
        redirect: "",
        children: [],
        // props: route => ({ ...route.query }),
        meta: {
          icon,
          title: menuOption.name,
          componentName: getFileNameFromPath(menuOption.component)!,
          keepAlive: true,
          closeable: menuOption.meta.closeable,
          menuOption: menuOption
        }
      };
      child.props = route => ({ ...route.query });
      layoutRoute.children?.push(child);
    } else {
      transMenuToRoute(menuOption.children || []);
    }
  }
}
