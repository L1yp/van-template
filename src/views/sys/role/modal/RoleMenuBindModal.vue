<template>
  <v-dialog
    v-model="visible"
    title="绑定菜单"
    :width="deviceType === 'h5' ? '360px' : '900px'"
    :full-screen="deviceType === 'h5'"
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
      node-key="id"
      :data="props.menuOptions"
      show-checkbox
      check-strictly
      expand-on-click-node
      check-on-click-node
      :default-checked-keys="selectIds"
      :props="{ label: 'name', children: 'children' }"
      @check="handleRowCheck"
    />
  </v-dialog>

</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import VDialog from "@/components/dialog/VDialog.vue";
import { computed, ref } from "vue";
import { getDeviceType, getTreeItemPath } from "@/utils/common";
import { CheckedInfo } from "element-plus/lib/components/tree-v2/src/types";
import { flatternTree, getSubTree } from "@/utils/common/tree";
import type { TreeKey } from "element-plus/es/components/tree/src/tree.type";
import { MenuOutputDTO, MenuType } from "@/api/sys/menu/types";

const deviceType = getDeviceType()

interface Props {
  modelValue: boolean
  menuOptions: MenuOutputDTO[]
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
  const data = flatternTree(props.menuOptions)
  data.forEach(row => {
    if(![MenuType.Page].includes(row.type) && row.children?.length) {
      // @ts-ignore
      row.disabled = true
    }
  })
  treeKey.value ++
}

function handleConfirm() {
  const keys = treeRef.value?.getCheckedKeys() as string[]
  emits('confirm', keys)
}

function handleRowCheck(row: MenuOutputDTO, checkState: CheckedInfo) {
  console.log(row, checkState)
  if(![MenuType.Page, MenuType.Tab].includes(row.type)) {
    return
  }

  // checked now
  if (checkState.checkedKeys.includes(row.id)) {
    const result = getTreeItemPath(props.menuOptions, 'id', row.id, false)
    console.log(result)
    result.forEach(it => treeRef.value?.setChecked(it.id, true, false))
  } else {
    deepCheckParent(row, treeRef.value?.getCheckedKeys() || [])
  }

}

function deepCheckParent(row: MenuOutputDTO, checkedKeys: TreeKey[]) {
  const parent = getTreeItemPath(props.menuOptions, 'id', row.id, false)
  if (parent?.length > 0) {
    const parentRow = parent[parent.length - 1]
    const brother: MenuOutputDTO[] = []
    getSubTree(brother, [parentRow], true)
    if (brother.every(it => !checkedKeys.includes(it.id))) {
      treeRef.value?.setChecked(parentRow.id, false, false)

      deepCheckParent(parentRow, treeRef.value?.getCheckedKeys() || [])
    }
  } else {

  }
}

</script>