<template>
  <div style="width: 100%; height: 100%;">
    <v-table :ref="setTableRef" :data="filterMenuList" :columns="columns" v-bind="gridOptions">
      <template #buttons>
        <el-input style="width: 200px" size="default" placeholder="权限名称" v-model="nameKey"></el-input>
        <el-button style="margin-left: 12px;" type="primary" :icon="Plus" plain @click="handleAdd">新增</el-button>
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
    <PermModal :mode="operationType" v-model="modalVisible" :options="tableData" :init-data="currentRow" @confirm="handleModalConfirm"/>
  </div>
</template>
<script setup lang="ts">
import VTable from "@/components/table/VTable.vue";
import { columns } from "@/views/sys/perm/hook";
import PermApi from "@/api/sys/perm";
import { computed, nextTick, ref, onMounted } from "vue";
import { ElButton, ElInput, ElPopconfirm, TableColumnCtx } from "element-plus";
import { PermAddDTO, PermOutputDTO, PermUpdateDTO } from "@/api/sys/perm/types";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { filterDataWithTitle, toTree } from "@/utils/common";
import PermModal from "@/views/sys/perm/modal/PermModal.vue";
import ArrowMove20Regular from '@/assets/icons/ArrowMove20Regular.svg'
import { useTableHook } from "@/hooks/grid.hook";
import ArrowMoveInward20Regular from "@/assets/icons/ArrowMoveInward20Regular.svg";


const nameKey = ref('')

const {
  gridOptions,
  setTableRef, tableRef,
  loadTableData, tableData,
  handleAdd, handleEdit, handleDelete,
  modalVisible, operationType, currentRow, handleModalConfirm,
  expandOrShrinkAll,
} = useTableHook<PermOutputDTO, void, PermAddDTO, PermUpdateDTO>({
  async afterLoadData(list: PermOutputDTO[]) {
    console.log('after load data', list);
    return toTree(list, "id", "pid", "orderNo", "asc");
  },
  api: new PermApi(),
  columns,
  tableProps: {
    toolbar: true,
    rowKey: 'id',
    onCellClick: (row: PermOutputDTO, column: TableColumnCtx<PermOutputDTO>, cell: HTMLDivElement, event: PointerEvent) => {
      if (column.property === "name" && row.children?.length) {
        tableRef.value?.toggleRowExpansion(row);
      } else {
        tableRef.value?.toggleRowSelection(row);
      }
    },
  },
})

onMounted(loadTableData)

const filterMenuList = computed<PermOutputDTO[]>(() => {
  if (!nameKey.value) {
    return tableData.value;
  }
  const result: PermOutputDTO[] = [];
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

</style>