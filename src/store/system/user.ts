import { defineStore } from "pinia";
import { UserLoginResultDTO } from "@/api/sys/user/types";
import UserApi from "@/api/sys/user";
import { toTree } from "@/utils/common/tree";
import SparkMD5 from "spark-md5";

export const useUserStore = defineStore("user-store", {
  state: () => ({
    loginState: null as UserLoginResultDTO | null,
  }),
  actions: {
    async getLoginState() {
      const userApi = new UserApi()
      const data = await userApi.getLoginState()
      data.menuList = toTree(data.menuList, 'id', 'pid')
      this.loginState = data
    },
    async login(username: string, password: string) {
      const userApi = new UserApi()
      const md5pass = SparkMD5.hash(password);
      const data = await userApi.login({
        username: username,
        password: md5pass,
        captchaCode: '1111',
        captchaToken: '11',
      })
      data.menuList = toTree(data.menuList, 'id', 'pid')
      this.loginState = data
    },

  }
});