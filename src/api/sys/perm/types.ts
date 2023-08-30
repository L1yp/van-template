
/**
 * PermOutputDTO，权限类型
 */
export interface PermOutputDTO extends Tree {
  /**
   * 创建者ID
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * ID
   */
  id: string;
  /**
   * 权限标识符
   */
  permKey: string;
  /**
   * 父级权限ID
   */
  pid?: string;
  /**
   * 权限说明
   */
  name: string;

  orderNo: number

  /**
   * 更新人ID
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
}

/**
 * PermUpdateDTO，权限更新接口入参
 */
export interface PermUpdateDTO {
  /**
   * id
   */
  id: string;

  orderNo: number

  /**
   * 权限说明
   */
  name?: string;
}

/**
 * PermAddDTO，权限新增入参
 */
export interface PermAddDTO {
  /**
   * 权限标识符
   */
  permKey?: string;
  /**
   * 父级权限ID
   */
  pid?: string;
  /**
   * 权限说明
   */
  name?: string;

  orderNo: number

}
