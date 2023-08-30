import { InjectionKey, Ref } from "vue";
import { UserOutputDTO } from "@/api/sys/user/types";

export const userMapKey = Symbol('userMapKey') as InjectionKey<Map<string, UserOutputDTO>>

export const permissionKey = Symbol("permission") as InjectionKey<Ref<Set<string>>>
