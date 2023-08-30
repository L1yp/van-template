import { TableColumnCtx } from "element-plus";

/**
 * MenuOutputDTO，菜单结构
 */
export interface MenuOutputDTO extends Tree {
  /**
   * 组件路径
   */
  component: string;
  createBy: string;
  createTime: string;
  id: string;
  meta: MenuMeta;
  /**
   * 菜单名称
   */
  name: string;
  /**
   * 序号
   */
  orderNo: number;
  /**
   * 路由地址
   */
  path: string;
  /**
   * 父级菜单ID
   */
  pid: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 状态
   */
  status: number;
  /**
   * 菜单类型
   */
  type: MenuType;
  updateBy: string;
  updateTime: string;
}

/**
 * MenuMeta，菜单原数据
 */
export interface MenuMeta {
  closeable?: boolean;
  icon?: string;
}

/**
 * 菜单类型
 */
export enum MenuType {
  Folder = 1,
  Tab = 2,
  Page = 3,
}

export function formatMenuType(row: MenuOutputDTO, column: TableColumnCtx<MenuOutputDTO>, cellValue: number, index: number) {
  const arr = ['', '文件夹', '页面容器', '页面', '按钮']
  return arr[cellValue]
}

/**
 * MenuAddDTO，新增菜单类型
 */
export interface MenuAddDTO {
  /**
   * 组件路径
   */
  component?: string;
  meta: MenuMeta;
  /**
   * 菜单名称
   */
  name: string;
  /**
   * 序号
   */
  orderNo: number;
  /**
   * 路由地址
   */
  path?: string;
  /**
   * 父级菜单ID
   */
  pid?: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 状态
   */
  status: number;
  /**
   * 菜单类型
   */
  type: number;
}

/**
 * MenuUpdateDTO，更新角色类型
 */
export interface MenuUpdateDTO {
  /**
   * 组件路径
   */
  component?: string;
  /**
   * id
   */
  id: string;
  meta: MenuMeta;
  /**
   * 菜单名称
   */
  name: string;
  /**
   * 序号
   */
  orderNo: number;
  /**
   * 路由地址
   */
  path?: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 状态
   */
  status: number;
}

