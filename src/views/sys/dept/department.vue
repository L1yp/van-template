<template>
  <div style="width: 100%; height: 100%;">
    <v-table :ref="setTableRef" :data="tableData" :columns="columns" v-bind="gridOptions">
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
    <dept-cu-modal :options="tableData" :data="currentRow" v-model="modalVisible" :mode="operationType" @confirm="handleModalConfirm" />
  </div>
</template>
<script setup lang="ts">
import VTable from "@/components/table/VTable.vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { ElButton, ElPopconfirm, TableColumnCtx } from "element-plus";
import { onMounted } from "vue";
import DeptCuModal from "@/views/sys/dept/modal/dept-cu-modal.vue";
import ArrowMove20Regular from "@/assets/icons/ArrowMove20Regular.svg";
import ArrowMoveInward20Regular from "@/assets/icons/ArrowMoveInward20Regular.svg";
import { useTableHook } from "@/hooks/grid.hook";
import { toTree } from "@/utils/common";
import { DepartmentAddDTO, DepartmentOutputDTO, DepartmentUpdateDTO } from "@/api/sys/dept/types";
import DeptApi from "@/api/sys/dept";
import { columns } from "@/views/sys/dept/hook";


const {
  gridOptions,
  setTableRef, tableRef,
  loadTableData, tableData,
  handleAdd, handleEdit, handleDelete,
  modalVisible, operationType, currentRow, handleModalConfirm,
  expandOrShrinkAll,
} = useTableHook<DepartmentOutputDTO, void, DepartmentAddDTO, DepartmentUpdateDTO>({
  async afterLoadData(list: DepartmentOutputDTO[]) {
    console.log('after load data', list);
    return toTree(list, "id", "pid", "orderNo", "asc");
  },
  api: new DeptApi(),
  columns,
  tableProps: {
    toolbar: true,
    rowKey: 'id',
    onCellClick: (row: DepartmentOutputDTO, column: TableColumnCtx<DepartmentOutputDTO>, cell: HTMLDivElement, event: PointerEvent) => {
      if (column.property === "name" && row.children?.length) {
        tableRef.value?.toggleRowExpansion(row);
      } else {
        tableRef.value?.toggleRowSelection(row);
      }
    },
  },
})

onMounted(loadTableData)

</script>
<style scoped>

</style>