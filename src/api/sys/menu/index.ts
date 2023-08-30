import BaseApi from "@/api/base-api";
import { MenuAddDTO, MenuOutputDTO, MenuUpdateDTO } from "@/api/sys/menu/types";

export default class MenuApi extends BaseApi<MenuOutputDTO, any, MenuAddDTO, MenuUpdateDTO> {
  constructor() {
    super('/menu');
  }
}