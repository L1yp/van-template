<template>
  <div style="width: 100%; height: 100%;">
    <v-table :ref="setTableRef" :data="filterMenuList" :columns="columns" v-bind="gridOptions">
      <template #buttons>
        <el-button type="primary" :icon="Plus" plain @click="handleAdd">新增</el-button>
        <el-button type="info" :icon="ArrowMove20Regular" @click="expandOrShrinkAll(tableData, true)">展开</el-button>
        <el-button type="info" :icon="ArrowMoveInward20Regular" @click="expandOrShrinkAll(tableData, false)">折叠</el-button>
      </template>
      <template #operation="scope">
        <el-button plain style="vertical-align: middle" link :icon="Edit" @click.stop="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="确定删除?" confirmButtonText="确定" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
          <template #reference>
            <el-button plain style="vertical-align: middle" link :icon="Delete" @click.stop>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </v-table>
    <MenuCreateModal v-model="modalVisible" :mode="operationType" :menu-tree="tableData" @confirm="handleModalConfirm" :init-data="currentRow"  />
  </div>
</template>

<script lang="ts" setup>
import VTable from "@/components/table/VTable.vue";
import MenuApi from "@/api/sys/menu";
import { onMounted, computed, nextTick } from "vue";
import { MenuAddDTO, MenuOutputDTO, MenuUpdateDTO } from "@/api/sys/menu/types";
import { filterDataWithTitle, toTree } from "@/utils/common";
import { ElButton, ElPopconfirm, TableColumnCtx } from "element-plus";
import { nameKey, columns } from "./hook";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { useTableHook } from "@/hooks/grid.hook";
import MenuCreateModal from "@/views/sys/menu/modal/MenuCreateModal.vue";
import { installLayoutContentRoute, uninstallLayoutContentRoute } from "@/router";
import { useUserStore } from "@/store/system/user";
import ArrowMoveInward20Regular from '@/assets/icons/ArrowMoveInward20Regular.svg'
import ArrowMove20Regular from '@/assets/icons/ArrowMove20Regular.svg'


const userStore = useUserStore()

const {
  gridOptions,
  setTableRef, tableRef,
  loadTableData, tableData,
  handleAdd, handleEdit, handleDelete,
  modalVisible, operationType, currentRow, handleModalConfirm,
  expandOrShrinkAll,
} = useTableHook<MenuOutputDTO, void, MenuAddDTO, MenuUpdateDTO>({
  async afterLoadData(list: MenuOutputDTO[]) {
    return toTree(list, "id", "pid", "orderNo", "asc");
  },
  async afterModalConfirm() {
    await userStore.getLoginState();
    uninstallLayoutContentRoute();
    installLayoutContentRoute(userStore.loginState!.menuList);
  },
  api: new MenuApi(),
  columns,
  tableProps: {
    toolbar: true,
    rowKey: 'id',
    onCellClick: (row: MenuOutputDTO, column: TableColumnCtx<MenuOutputDTO>, cell: HTMLDivElement, event: PointerEvent) => {
      if (column.property === "name" && row.children?.length) {
        tableRef.value?.toggleRowExpansion(row);
      } else {
        tableRef.value?.toggleRowSelection(row);
      }
    },
  },
})

onMounted(loadTableData)

const filterMenuList = computed<MenuOutputDTO[]>(() => {
  if (!nameKey.value) {
    return tableData.value;
  }
  const result: MenuOutputDTO[] = [];
  filterDataWithTitle(
    result,
    tableData.value,
    nameKey.value,
    "name",
    undefined
  );
  if (result.length > 0) nextTick(() => expandOrShrinkAll(result, true));
  return result;
});

</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>