<template>
  <div style="width: 100%; height: 100%;">
    <v-table :ref="setTableRef" :data="tableData" :columns="columns" v-bind="gridOptions">
      <template #buttons>
        <el-button type="primary" :icon="Plus" plain @click="handleAdd">新增</el-button>
      </template>
      <template #operation="scope">
        <el-button plain style="vertical-align: middle" link :icon="Edit" @click.stop="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="确定删除?" confirmButtonText="确定" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
          <template #reference>
            <el-button plain style="vertical-align: middle" link :icon="Delete" @click.stop>删除</el-button>
          </template>
        </el-popconfirm>
        <el-button plain style="vertical-align: middle;" text @click.stop="handleBindMenu(scope.row)" :icon="Link">关联菜单</el-button>
        <el-button plain style="vertical-align: middle;" text @click.stop="handleBindPerm(scope.row)" :icon="Link">关联权限</el-button>
      </template>
    </v-table>
    <RoleCreateModal v-model="modalVisible" :mode="operationType" :init-data="currentRow" @confirm="handleModalConfirm" />
    <RoleMenuBindModal v-model="bindMenuModalVisible" :menu-options="menuTree" :select-ids="boundMenuIdList" @confirm="handleConfirmBindMenu" />
    <RolePermBindModal v-model="bindPermModalVisible" :options="permTree" :select-ids="boundPermKeyList" @confirm="handleConfirmBindPerm" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from "vue"
import {
  ElButton, ElMessage, ElPopconfirm
} from "element-plus";
import { Plus, Edit, Delete, Link } from "@element-plus/icons-vue";
import RoleCreateModal from "@/views/sys/role/modal/RoleCreateModal.vue";
import RoleMenuBindModal from "@/views/sys/role/modal/RoleMenuBindModal.vue";
import { RoleAddDTO, RoleOutputDTO, RoleUpdateDTO } from "@/api/sys/role/types";
import { MenuOutputDTO } from "@/api/sys/menu/types";
import { toTree } from "@/utils/common";
import MenuApi from "@/api/sys/menu";
import RolePermBindModal from "@/views/sys/role/modal/RolePermBindModal.vue";
import { PermOutputDTO } from "@/api/sys/perm/types";
import PermApi from "@/api/sys/perm";
import { columns } from "./hook";
import VTable from "@/components/table/VTable.vue";
import { useTableHook } from "@/hooks/grid.hook";
import RoleApi from "@/api/sys/role";



const roleApi = new RoleApi()
const {
  loading,
  gridOptions,
  setTableRef, tableRef,
  loadTableData, tableData,
  handleAdd, handleEdit, handleDelete,
  modalVisible, operationType, currentRow, handleModalConfirm,
} = useTableHook<RoleOutputDTO, void, RoleAddDTO, RoleUpdateDTO>({
  api: roleApi,
  columns,
  tableProps: {
    toolbar: true,
    rowKey: 'id',
    onCellClick: (row: RoleOutputDTO) => {
      tableRef.value?.toggleRowSelection(row);
    },
  },
})

onMounted(loadTableData)

const menuApi = new MenuApi()
const permApi = new PermApi()
// 加载菜单、权限列表
onBeforeMount(async () => {
  try {
    const menuList = await menuApi.list()
    menuTree.value = toTree(menuList, 'id', "pid", "orderNo", "asc")
    const permList = await permApi.list()
    permTree.value = toTree(permList, 'id', "pid", "orderNo", "asc")
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '加载数据失败')
  }
})

/*菜单绑定*/
async function handleBindMenu(row: RoleOutputDTO) {
  try {
    loading.value = true
    boundMenuIdList.value = await roleApi.getMenuIdList(row.id)
    currentRow.value = row
    bindMenuModalVisible.value = true
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '查询绑定菜单失败')
  } finally {
    loading.value = false
  }

}
const bindMenuModalVisible = ref(false)
const menuTree = ref<MenuOutputDTO[]>([])
const boundMenuIdList = ref<string[]>([])
async function handleConfirmBindMenu(menuIds: string[]) {
  try {
    loading.value = true
    if (!currentRow.value) {
      return
    }
    await roleApi.bindMenu({
      roleId: currentRow.value.id,
      menuIds
    })
    ElMessage.success('绑定菜单成功')
    bindMenuModalVisible.value = false
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '绑定菜单失败')
  } finally {
    loading.value = false
  }
}

/*权限绑定*/
async function handleBindPerm(row: RoleOutputDTO) {
  try {
    loading.value = true
    const permList = await roleApi.getPermList(row.id)
    boundPermKeyList.value = permList.map(it => it.permKey)
    currentRow.value = row
    bindPermModalVisible.value = true
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '查询绑定权限失败')
  } finally {
    loading.value = false
  }
}
const bindPermModalVisible = ref(false)
const permTree = ref<PermOutputDTO[]>([])
const boundPermKeyList = ref<string[]>([])
async function handleConfirmBindPerm(permKeyList: string[]) {
  try {
    loading.value = true
    if (!currentRow.value) {
      return
    }
    await roleApi.bindPerm({
      roleId: currentRow.value.id,
      permKeyList
    })
    ElMessage.success('绑定权限成功')
    bindPermModalVisible.value = false
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '绑定权限失败')
  } finally {
    loading.value = false
  }
}




</script>
