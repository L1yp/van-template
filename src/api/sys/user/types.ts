import { MenuOutputDTO } from "@/api/sys/menu/types";

/**
 * 用户登录参数类型
 */
export interface UserLoginDTO {
  /**
   * 图形验证码
   */
  captchaCode: string;
  /**
   * 验证码Token
   */
  captchaToken: string;
  /**
   * 密码MD5
   */
  password: string;
  /**
   * 用户名
   */
  username: string;
}

/**
 * UserAddDTO，用户注册类型
 */
export interface UserAddDTO {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 推荐人Id
   */
  parentId?: string;
  /**
   * 用户密码
   */
  password: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 状态
   */
  status: number;
  /**
   * 用户名
   */
  username: string;

  deptId?: string

  deptIdList: string[]

  roleIdList: string[]

}


/**
 * 更新用户类型
 */
export interface UserUpdateDTO {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * id
   */
  id: string;
  /**
   * 昵称
   */
  nickname?: string;
  /**
   * 状态
   */
  status?: number;

  deptId?: string


  deptIdList: string[]

  roleIdList: string[]
}


/**
 * UserLoginResultDTO，登录结果响应
 */
export interface UserLoginResultDTO {
  /**
   * 菜单列表
   */
  menuList: MenuOutputDTO[];
  /**
   * 权限列表
   */
  permKeyList: string[];
  /**
   * 角色ID列表
   */
  roleIdList: string[];
  /**
   * token
   */
  token: string;
  userInfo: UserOutputDTO;
}

/**
 * UserOutputDTO，用户类型
 */
export interface UserOutputDTO {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 创建者ID
   */
  createBy: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * ID
   */
  id: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 昵称拼音
   */
  nicknamePinyin: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 注册IP
   */
  registerIp: string;
  /**
   * 状态
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
  /**
   * 用户名
   */
  username: string;

  deptIdList: string[]
  roleIdList: string[]
}

export interface UserQueryPageDTO {
  /**
   * 关键词
   */
  keyword?: string;

  /**
   * 状态
   */
  status?: number;
}

