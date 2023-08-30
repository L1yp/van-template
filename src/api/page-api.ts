import { request } from './request'

export default class PageApi<ModelDTO, ListQueryDTO> {

  private readonly base: string;
  constructor(base: string) {
    this.base = base;
  }

  /**
   * 获取所有数据
   * @param params 筛选参数
   */
  public async list(params?: ListQueryDTO): Promise<ModelDTO[]> {
    return request<ModelDTO[]>({
      url: `${this.base}/list`,
      method: 'get',
      params
    })
  }

  /**
   * 分页列表
   * @param params 分页筛选参数
   */
  public async page(params: ListQueryDTO & PageQueryDTO): Promise<PageData<ModelDTO>> {
    return request<PageData<ModelDTO>>({
      url: `${this.base}/page`,
      method: 'get',
      params
    })
  }



}