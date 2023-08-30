import { request } from "@/api/request";
import BaseApi from "@/api/base-api";
import {
  UserAddDTO,
  UserLoginDTO,
  UserLoginResultDTO,
  UserOutputDTO,
  UserQueryPageDTO,
  UserUpdateDTO
} from "@/api/sys/user/types";

export default class UserApi extends BaseApi<UserOutputDTO, UserQueryPageDTO, UserAddDTO, UserUpdateDTO> {

  constructor() {
    super('/user');
  }


  /**
   * 查询关联的角色列表
   */
  public getRoleIdList(uid: string): Promise<string[]> {
    return request<string[]>({
      method: "get",
      url: `/user/role`,
      params: { uid }
    });
  }

  /**
   * 查询关联的兼职部门列表
   */
  public getDeptIdList(uid: string): Promise<string[]> {
    return request<string[]>({
      method: "get",
      url: `/user/dept`,
      params: { uid }
    });
  }

  /**
   * 绑定角色
   */
  public bindRole(userId: string, roleIdList: string[]): Promise<void> {
    return request<void>({
      method: "post",
      url: `/user/bind/role`,
      data: { userId, roleIdList }
    });
  }

  /**
   * 登录
   */
  public login(data: UserLoginDTO) {
    return request<UserLoginResultDTO>({
      method: "post",
      url: `/user/login`,
      data
    });
  }

  /**
   * 登录状态
   */
  public getLoginState() {
    return request<UserLoginResultDTO>({
      method: "get",
      url: `/user/state`
    });
  }


}