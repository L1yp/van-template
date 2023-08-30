import { inject } from "vue";
import { userMapKey } from "@/config/app.keys";

export function useUserMap() {
  return inject(userMapKey)!
}
