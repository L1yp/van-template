
/**
 * UserLoginLogOutputDTO
 */
export interface UserLoginLogOutputDTO {
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
  loginIp: string;
  loginType: number;
  nickname: string;
  username: string;
}