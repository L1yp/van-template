import { defineStore } from "pinia";
import { useDark } from "@vueuse/core";
import ConfigApi from "@/api/sys/config";
import { ConfigEnumOutputDTO } from "@/api/sys/config/types";

const dark = useDark();
export const useSystemStore = defineStore("system-store", {
  state: () => ({
    dark,
    statusMap: {} as Record<string, ConfigEnumOutputDTO[]>,
  }),
  actions: {
    async getEnumList() {
      const configApi = new ConfigApi()
      this.statusMap = await configApi.getEnumList()
    }
  }
});