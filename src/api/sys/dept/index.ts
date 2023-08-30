import BaseApi from "@/api/base-api";
import { DepartmentAddDTO, DepartmentOutputDTO, DepartmentUpdateDTO } from "@/api/sys/dept/types";

export default class DeptApi extends BaseApi<DepartmentOutputDTO, void, DepartmentAddDTO, DepartmentUpdateDTO> {
  constructor() {
    super('/dept');
  }
}