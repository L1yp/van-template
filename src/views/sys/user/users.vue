<template>
  <div style="width: 100%; height: 100%;">
    <v-table :ref="setTableRef" :data="tableData" :columns="columns" v-bind="gridOptions">
      <template #buttons>
        <el-button type="primary" :icon="Plus" plain @click="handleAdd">新增</el-button>
        <el-form :model="params"  inline inline-message style="margin-left: 6px">
          <el-form-item prop="keyword" label="关键字" style="margin-bottom: 0">
            <el-input v-model="params.keyword" @change="loadTableData" />
          </el-form-item>
          <el-form-item prop="status" label="状态" style="margin-bottom: 0">
            <dict-input
              v-model="params.status"
              dict-key="common.status"
              :expand-options="false"
              :attrs="{ clearable: true }"
              @change="loadTableData"
            />
          </el-form-item>
        </el-form>
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
    <user-cu-modal v-model="modalVisible" :data="currentRow" :mode="operationType" @confirm="handleModalConfirm" />
  </div>
</template>
<script setup lang="ts">
import { columns } from "./hook";
import VTable from "@/components/table/VTable.vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { ElButton, ElPopconfirm, ElForm, ElFormItem, ElInput, TableColumnCtx } from "element-plus";
import { onMounted, reactive } from "vue";
import UserCuModal from "@/views/sys/user/modal/user-cu-modal.vue";
import DictInput from "@/components/dict/DictInput.vue";
import { useTableHook } from "@/hooks/grid.hook";
import { UserAddDTO, UserOutputDTO, UserQueryPageDTO, UserUpdateDTO } from "@/api/sys/user/types";
import UserApi from "@/api/sys/user";

const params = reactive<UserQueryPageDTO & PageQueryDTO>({
  keyword: "",
  status: 1,
  pageIdx: 1,
  pageSize: 20
});

const {
  gridOptions,
  setTableRef, tableRef,
  loadTableData, tableData,
  handleAdd, handleEdit, handleDelete,
  modalVisible, operationType, currentRow, handleModalConfirm,
} = useTableHook<UserOutputDTO, UserQueryPageDTO, UserAddDTO, UserUpdateDTO>({
  api: new UserApi(),
  columns,
  queryParam: params,
  tableProps: {
    toolbar: true,
    pagination: true,
    page: {
      pageIdx: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100],
      total: 0,
    },
    rowKey: 'id',
    size: 'small',
    onCellClick: (row: UserOutputDTO) => {
      tableRef.value?.toggleRowSelection(row);
    },
  },
})

onMounted(loadTableData)
</script>
<style scoped>

</style>