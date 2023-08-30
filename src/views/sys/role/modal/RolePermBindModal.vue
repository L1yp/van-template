<template>
  <v-dialog
    v-model="visible"
    title="绑定权限"
    :width="deviceType === 'h5' ? '360px' : '900px'"
    :full-screen="deviceType === 'h5'"
    init-full-screen
    destory-on-close
    :fixed-body-height="false"
    use-body-scrolling
    :loading="loading"
    @opened="handleOpened"
    @confirm="handleConfirm"
    @cancel="visible = false"
  >

    <el-tree
      :key="treeKey"
      ref="treeRef"
      height="100%"
      node-key="permKey"
      :data="props.options"
      default-expand-all
      show-checkbox
      check-strictly
      expand-on-click-node
      check-on-click-node
      :default-checked-keys="selectIds"
      :props="{ label: 'name', children: 'children', disabled: data => data?.children?.length }"
    />
  </v-dialog>

</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import VDialog from "@/components/dialog/VDialog.vue";
import { computed, ref } from "vue";
import { getDeviceType } from "@/utils/common";
import { flatternTree } from "@/utils/common/tree";
import { PermOutputDTO } from "@/api/sys/perm/types";

const deviceType = getDeviceType()

interface Props {
  modelValue: boolean
  options: PermOutputDTO[]
  selectIds: string[]
}

interface Emits {
  (e: 'update:modelValue', v: boolean): void
  (e: 'confirm', rows: string[]): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const visible = computed<boolean>({
  get: () => props.modelValue,
  set: v => emits('update:modelValue', v)
})

const treeKey = ref(1)
const treeRef = ref<InstanceType<typeof ElTree>>()

const loading = ref<boolean>(false)
function handleOpened() {
  treeKey.value ++
}

function handleConfirm() {
  const keys = treeRef.value?.getCheckedKeys() as string[]
  console.log('keys', keys);
  emits('confirm', keys)
}

</script>