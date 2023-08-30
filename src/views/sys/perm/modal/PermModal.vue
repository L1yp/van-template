<template>
  <VDialog
    v-model="visible"
    :title="props.mode === 'create' ? '创建权限' : '更新权限'"
    :width="deviceType === 'h5' ? '360px' : '720px'"
    :full-screen="deviceType === 'h5'"
    :fixed-body-height="deviceType === 'h5'"
    :use-body-scrolling="deviceType !== 'h5'"
    @cancel="visible = false"
    @confirm="handleConfirm"
    @open="handleOpen"
  >
    <el-form :model="formData" label-width="80px" :label-position="formLabelPosition" scroll-to-error>
      <el-form-item prop="permKey" label="权限标识" required>
        <el-input v-model="formData.permKey" />
      </el-form-item>
      <el-form-item prop="name" label="权限描述" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item prop="pid" label="父级ID">
        <el-tree-select
          v-model="formData.pid"
          :data="parentOptions"
          check-strictly
          node-key="id"
          style="width: 100%"
          :props="{ children: 'children', label: 'name', value: 'id' }"
        />
      </el-form-item>
      <el-form-item prop="orderNo" label="序号" required style="margin-bottom: 0">
        <el-input-number v-model="formData.orderNo" :controls="false" style="width: 100%" />
      </el-form-item>
    </el-form>

  </VDialog>

</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElInputNumber, ElTreeSelect } from "element-plus";
import { computed, ref } from "vue";
import VDialog from "@/components/dialog/VDialog.vue";
import { getDeviceType } from "@/utils/common";
import { formLabelPosition } from "@/store/layout";
import { PermAddDTO, PermOutputDTO, PermUpdateDTO } from "@/api/sys/perm/types";
import { filterDataWithCustom } from "@/utils/common/tree";

const deviceType = getDeviceType();

interface Props {
  modelValue: boolean;
  mode: OperationType;
  initData?: PermOutputDTO;
  options: PermOutputDTO[]
}

interface Emits {
  (e: "update:modelValue", v: boolean): void;

  (e: "confirm", formData: PermAddDTO & PermUpdateDTO): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const visible = computed({
  get: () => props.modelValue,
  set: v => emits("update:modelValue", v)
});

const formData = ref<PermAddDTO & PermUpdateDTO>({
  id: "",
  name: "",
  orderNo: 1,
  pid: "",
  permKey: ""
});

function handleOpen() {
  if (props.mode === "create") {
    formData.value = {
      id: "",
      name: "",
      orderNo: 1,
      pid: "",
      permKey: ""
    };
  } else {
    Object.assign(formData.value, props.initData);
  }
}

function handleConfirm() {
  emits("confirm", formData.value);
}

const parentOptions = computed(() => {
  const result: PermOutputDTO[] = []
  filterDataWithCustom(result, props.options, it => !it.pid, it => !it.children?.length)
  return result
})

</script>

<style scoped>

</style>