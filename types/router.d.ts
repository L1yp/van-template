import 'vue-router';
import { Component } from "vue";
import { MenuOutputDTO } from "@/api/sys/menu/types";

declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: boolean
    icon?: string | Component
    componentName: string
    title: string
    closeable?: boolean
    menuOption?: MenuOutputDTO
  }
}