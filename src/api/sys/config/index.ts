import { request } from "@/api/request";
import { ConfigEnumOutputDTO } from "@/api/sys/config/types";

export default class ConfigApi {

  /**
   * 获取枚举配置信息
   */
  public getEnumList() {
    return request<Record<string, ConfigEnumOutputDTO[]>>({
      url: `/config/getEnumList`,
      method: 'get'
    })
  }
}