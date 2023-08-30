import BaseApi from "@/api/base-api";
import { PermAddDTO, PermOutputDTO, PermUpdateDTO } from "@/api/sys/perm/types";


export default class PermApi extends BaseApi<PermOutputDTO, any, PermAddDTO, PermUpdateDTO> {
  constructor() {
    super('/perm');
  }
}