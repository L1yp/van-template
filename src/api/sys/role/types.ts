/**
 * RoleUpdateDTO，更新角色类型
 */
export interface RoleUpdateDTO {
  /**
   * 角色分类
   */
  category: string;
  /**
   * id
   */
  id: string;
  /**
   * 角色名称
   */
  name: string;
  /**
   * 排序序号
   */
  orderNo: number;
  /**
   * 状态
   */
  status: number;
}

/**
 * RolePermBindDTO，绑定权限入参
 */
export interface RolePermBindDTO {
  /**
   * 权限标识符列表
   */
  permKeyList: string[];
  /**
   * 角色ID
   */
  roleId: string;
}

/**
 * RoleMenuBindDTO，角色绑定菜单参数
 */
export interface RoleMenuBindDTO {
  /**
   * 菜单ID列表
   */
  menuIds: string[];
  /**
   * 角色ID
   */
  roleId: string;
}

/**
 * RoleAddDTO，新增菜单类型
 */
export interface RoleAddDTO {
  /**
   * 角色分类
   */
  category: string;
  /**
   * 角色名称
   */
  name: string;
  /**
   * 排序序号
   */
  orderNo: number;
  /**
   * 状态
   */
  status: number;
}


/**
 * RoleOutputDTO，角色类型
 */
export interface RoleOutputDTO {
  /**
   * 角色分类
   */
  category?: string;
  /**
   * 创建者ID
   */
  createBy: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * ID
   */
  id: string;
  /**
   * 角色名称
   */
  name?: string;
  /**
   * 角色序号
   */
  orderNo?: number;
  /**
   * 角色状态
   */
  status?: number;
  /**
   * 更新人ID
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: Date;
}
