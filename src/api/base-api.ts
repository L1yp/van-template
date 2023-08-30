import { request } from './request'

export default class BaseApi<ModelDTO, ListQueryDTO, AddDTO, UpdateDTO> {

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

  /**
   * 新增
   * @param data 新增参数
   */
  public async add(data: AddDTO): Promise<void> {
    return request<void>({
      url: `${this.base}/add`,
      method: 'post',
      data
    })
  }

  /**
   * 更新
   * @param data 更新参数
   */
  public async update(data: UpdateDTO): Promise<void> {
    return request<void>({
      url: `${this.base}/update`,
      method: 'put',
      data
    })
  }

  /**
   * 删除
   * @param id rowId
   */
  public async delete(id: string): Promise<void> {
    return request<void>({
      url: `${this.base}/${id}`,
      method: 'delete',
    })
  }


  getEntityList(idList: string[]) {
    return request<ModelDTO[]>({
      method: "POST",
      url: `${this.base}/getEntityList`,
      data: { idList }
    });
  }


}