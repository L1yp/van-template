<template>
  <div style="width: 100%; height: 100%;">
    <v-table :ref="setTableRef" :data="tableData" :columns="columns" v-bind="gridOptions">
      <template #operation="scope">
        <el-button link :icon="View" @click.stop="handleView(scope.row)">详情</el-button>
      </template>
    </v-table>
  </div>
</template>
<script setup lang="ts">
import VTable from "@/components/table/VTable.vue";
import { columns } from "./hook";
import { onBeforeMount, reactive, ref } from "vue";
import { ElButton } from "element-plus";
import LoginLogApi from "@/api/sys/login-log";
import { UserLoginLogOutputDTO } from "@/api/sys/login-log/types";
import { View } from "@element-plus/icons-vue";
import { useTableHook } from "@/hooks/grid.hook";

const {
  gridOptions,
  setTableRef, tableRef,
  loadTableData, tableData,
} = useTableHook<UserLoginLogOutputDTO, void, void, void>({
  api: new LoginLogApi(),
  columns,
  tableProps: {
    toolbar: false,
    pagination: true,
    page: {
      pageIdx: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100],
      total: 0,
    },
    rowKey: 'id',
    size: 'small',
    onCellClick: (row: UserLoginLogOutputDTO) => {
      tableRef.value?.toggleRowSelection(row);
    },
  },
})

onBeforeMount(loadTableData)

function handleView(row: UserLoginLogOutputDTO) {}
</script>
<style scoped>

</style>