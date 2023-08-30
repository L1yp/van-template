
/**
 * DepartmentOutputDTO，部门信息
 */
export interface DepartmentOutputDTO extends Tree {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 部门助理
   */
  assistant?: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 创建者ID
   */
  createBy: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 职能描述
   */
  description?: string;
  /**
   * ID
   */
  id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 办公地点
   */
  officeLocation?: string;
  /**
   * 排序
   */
  orderNo: number;
  /**
   * 部门领导
   */
  owner?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 上级部门ID
   */
  pid?: string;
  /**
   * 简称
   */
  simpleName?: string;
  /**
   * 状态<br>1:启用<br>0:禁用
   */
  status: number;
  /**
   * 更新人ID
   */
  updateBy: string;
  /**
   * 更新时间
   */
  updateTime: string;
}

/**
 * DepartmentAddDTO，新增部门参数
 */
export interface DepartmentAddDTO {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 部门助理
   */
  assistant?: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 职能描述
   */
  description?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 办公地点
   */
  officeLocation?: string;
  /**
   * 排序
   */
  orderNo: number;
  /**
   * 部门领导
   */
  owner?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 上级部门ID
   */
  pid?: string;
  /**
   * 简称
   */
  simpleName?: string;
  /**
   * 状态<br>1:启用<br>0:禁用
   */
  status: number;
}

/**
 * DepartmentUpdateDTO，更新部门参数
 */
export interface DepartmentUpdateDTO {
  /**
   * 详细地址
   */
  address?: string;
  /**
   * 部门助理
   */
  assistant?: string;
  /**
   * 编号
   */
  code: string;
  /**
   * 职能描述
   */
  description?: string;
  /**
   * id
   */
  id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 办公地点
   */
  officeLocation?: string;
  /**
   * 排序
   */
  orderNo: number;
  /**
   * 部门领导
   */
  owner?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 上级部门ID
   */
  pid?: string;
  /**
   * 简称
   */
  simpleName?: string;
  /**
   * 状态<br>1:启用<br>0:禁用
   */
  status: number;
}
