import { UserLoginLogOutputDTO } from "@/api/sys/login-log/types";
import BaseApi from "@/api/base-api";

export default class LoginLogApi extends BaseApi<UserLoginLogOutputDTO, void, void, void> {
  constructor() {
    super('/user/login/log');
  }

}