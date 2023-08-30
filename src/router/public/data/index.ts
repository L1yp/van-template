import { RouteRecordRaw } from "vue-router";

export default [
  {
    path: '/data/import',
    component: () => import('@/views/business/data/data-import.vue'),
    name: 'data-import'
  }
] as RouteRecordRaw[]
