<template>
  <VDialog
    v-model="visible"
    :title="props.mode === 'create' ? '创建菜单' : '更新菜单'"
    @cancel="visible = false"
    @confirm="handleConfirm"
    @open="handleOpen"
    width="720px"
    :full-screen="deviceType === 'h5'"
    :fixed-body-height="deviceType === 'h5'"
    use-body-scrolling
  >
    <el-form :model="formData" label-width="100px" :label-position="formLabelPosition" scroll-to-error>
    <ElRow>
      <ElCol :span="24">
        <ElFormItem label="类型" prop="type" v-if="deviceType === 'pc'">
          <ElRadioGroup v-model="formData.type" :disabled="props.mode === 'update'">
            <ElRadioButton
              v-for="option in menuTypeOptions"
              :key="option.value"
              :value="option.value"
              :label="option.value"
            >
              {{option.label}}
            </ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="类型" prop="type" v-else>
          <el-select v-model="formData.type" :disabled="props.mode === 'update'" style="width: 100%;">
            <el-option v-for="option in menuTypeOptions" :key="option.value" :value="option.value" :label="option.label" />
          </el-select>
        </ElFormItem>
      </ElCol>
    </ElRow>
    <component :is="configComponents[formData.type]" :form-data="formData" :menu-tree="props.menuTree" />
  </el-form>
  </VDialog>

</template>

<script lang="ts" setup>
import VDialog from '@/components/dialog/VDialog.vue';
import { computed, markRaw, ref } from "vue";
import type { Component } from 'vue';
import {
  ElForm, ElFormItem, ElRadioGroup, ElRadioButton, ElRow, ElCol, ElSelect, ElOption,
} from "element-plus";
import FolderForm from './form/FolderForm.vue'
import TabsForm from './form/TabsForm.vue'
import PageForm from './form/PageForm.vue'
import { getDeviceType } from '@/utils/common';
import { formLabelPosition } from "@/store/layout";
import { MenuAddDTO, MenuOutputDTO, MenuUpdateDTO } from "@/api/sys/menu/types";

const deviceType = getDeviceType()

const menuTypeOptions = [
  { label: '文件夹', value: 1 },
  { label: '页面容器', value: 2 },
  { label: '页面', value: 3 },
]

interface Props {
  modelValue: boolean
  mode: 'create' | 'update'
  menuTree: MenuOutputDTO[]
  initData?: MenuOutputDTO
}

interface Emits {
  (e: 'update:modelValue', v: boolean): void
  (e: 'confirm', v: MenuAddDTO & MenuUpdateDTO): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const visible = computed<boolean>({
  get: () => props.modelValue,
  set: v => emits('update:modelValue', v)
})

const formData = ref<MenuAddDTO & MenuUpdateDTO>({
  id: '',
  name: '',
  pid: '',
  type: 1,
  path: '',
  component: '',
  meta: {
    icon: '',
    closeable: false,
  },
  orderNo: 0,
  status: 0,
  remark: ''
})

const configComponents: Record<number, Component> = {
  1: markRaw(FolderForm),
  2: markRaw(TabsForm),
  3: markRaw(PageForm),
}

function handleConfirm() {
  normalizeFormData()
  emits('confirm', formData.value)
}

function normalizeFormData() {
  const type = formData.value.type
  if (type === 1) {
    formData.value.meta!.closeable = undefined
    formData.value.component = undefined
    formData.value.path = undefined
  }
  else if (type === 4) {
    formData.value.meta.closeable = undefined
    formData.value.path = undefined
    formData.value.meta.icon = undefined
  }
}

function handleOpen() {
  formData.value = {
    id: '',
    name: '',
    pid: '',
    type: 1,
    path: '',
    component: '',
    meta: {
      icon: '',
      closeable: false,
    },
    orderNo: 0,
    status: 0,
    remark: ''
  }
  if (props.initData && props.mode === 'update') {
    Object.assign(formData.value, props.initData)
  }
}

</script>

<style scoped>

</style>