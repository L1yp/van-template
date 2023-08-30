import { createApp } from 'vue'
import App from './App.vue'
import { isReady, setupRouter } from './router'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import { ElLoading, ClickOutside } from 'element-plus';
import { setupAxios } from "./config/axios.http"
import { remove } from "./utils/storage"
import { userMapKey } from "./config/app.keys"
import { permission } from "@/directives/permission"

import './styles/index.css'
import { createPinia } from "pinia";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@/components/dialog/dialog.css'

import TextFilter from '@/components/ag-grid/filter/components/TextFilter.vue'
import OptionFilter from '@/components/ag-grid/filter/components/OptionFilter.vue'
import UserFilter from '@/components/ag-grid/filter/components/UserFilter.vue'
import DateFilter from '@/components/ag-grid/filter/components/DateFilter.vue'
import FieldCheckboxInput from "@/components/ag-grid/cell/components/FieldCheckboxInput.vue";
import FieldNumberInput from "@/components/ag-grid/cell/components/FieldNumberInput.vue";
import { useSystemStore } from "@/store/sys-config";
import { useUserStore } from "@/store/system/user";
import { UserOutputDTO } from "@/api/sys/user/types";

async function startup() {
  try {
    const app = createApp(App)
    const pinia = createPinia()
    app.use(pinia)

    app.component('TextFilter', TextFilter)
    app.component('OptionFilter', OptionFilter)
    app.component('UserFilter', UserFilter)
    app.component('DateFilter', DateFilter)
    app.component('FieldCheckboxInput', FieldCheckboxInput)
    app.component('FieldNumberInput', FieldNumberInput)



    setupAxios()

    app.use(ElLoading)

    app.directive('click-outside', ClickOutside)
    app.directive("perm", permission)

    const map = new Map<string, UserOutputDTO>()
    app.provide(userMapKey, map)

    const userStore = useUserStore()
    const sysStore = useSystemStore()
    try {
      await sysStore.getEnumList();
      await userStore.getLoginState()
    } catch (e) {
      remove("isLogin")
      remove("tags")
      console.log(e);
      e instanceof Error && console.error(e.message)
    }

    console.log("startup setup router before");
    // @ts-ignore
    setupRouter(app, userStore.loginState?.menuList || [])
    console.log("startup setup router after")

    await isReady();
    console.log("router is ready now");

    app.mount('#app')
  } catch (e) {
    console.log(e);
  }

}

startup()

