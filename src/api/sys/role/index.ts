import { request } from "@/api/request";
import BaseApi from "@/api/base-api";
import { RoleAddDTO, RoleMenuBindDTO, RoleOutputDTO, RolePermBindDTO, RoleUpdateDTO } from "@/api/sys/role/types";
import { PermOutputDTO } from "@/api/sys/perm/types";

export default class RoleApi extends BaseApi<RoleOutputDTO, void, RoleAddDTO, RoleUpdateDTO> {
  constructor() {
    super('/role');
  }

  /**
   * 查询角色绑定的菜单
   * @param roleId
   */
  public getMenuIdList(roleId: string){
    return request<string[]>({
      method: 'get',
      url: `/role/menu?roleId=${roleId}`
    })
  }

  /**
   * 绑定菜单
   */
  public bindMenu(data: RoleMenuBindDTO) {
    return request<void>({
      method: 'post',
      url: `/role/menu/bind`,
      data
    })
  }

  /**
   * 查询角色绑定的权限列表
   * @param roleId
   */
  public getPermList(roleId: string){
    return request<PermOutputDTO[]>({
      method: 'get',
      url: `/role/perm?roleId=${roleId}`
    })
  }

  /**
   * 绑定权限
   */
  public bindPerm(data: RolePermBindDTO) {
    return request<void>({
      method: 'post',
      url: `/role/perm/bind`,
      data
    })
  }




}


