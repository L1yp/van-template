import { TableColumnDefinition, VTableInstance, VTableProps } from "@/components/table/utils/types";
import { UserAddDTO, UserOutputDTO, UserQueryPageDTO, UserUpdateDTO } from "@/api/sys/user/types";
import DictInput from "@/components/dict/DictInput.vue";
import { ElButton, ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import UserApi from "@/api/sys/user";
import SparkMD5 from "spark-md5";

export const columns = [
  {
    type: "selection",
    width: 50,
    align: "center",
    headerAlign: "center"
  },
  {
    prop: "id",
    label: "#",
    width: 80,
    align: "center",
    headerAlign: "center"
  },
  {
    prop: "username",
    label: "用户名",
    minWidth: 200
  },
  {
    prop: "nickname",
    label: "昵称",
    minWidth: 200
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    align: "center",
    headerAlign: "center",
    cellRender: row => (
      <DictInput dictKey="common.status" modelValue={row.status} readonly />
    )
  },
  {
    label: "操作",
    fixed: "right",
    width: 200,
    slot: "operation"
  }
] as TableColumnDefinition<UserOutputDTO>[];

export const gridOptions = reactive({
  columns,
  toolbar: true,
  pagination: true,
  page: {
    pageIdx: 1,
    pageSize: 20,
    total: 0,
    pageSizes: [ 20, 50, 100 ]
  },
  border: true,
  height: "100%",
  size: "small",
  onPageChange: loadTableData,
  onRowClick(row) {
    console.log(row, tableRef.value);
    tableRef.value?.toggleRowSelection(row, undefined);
  },
  onSelectionChange(selection) {
    selectRows.value = selection;
  }
}) as VTableProps<UserOutputDTO>;

const userApi = new UserApi();
export const tableRef = ref<VTableInstance>();

export function setTableRef(el: any) {
  tableRef.value = el;
}


export const loading = ref(false);
export const params = reactive<UserQueryPageDTO & PageQueryDTO>({
  keyword: "",
  status: 1,
  pageIdx: 1,
  pageSize: 20
});
export const tableData = ref<UserOutputDTO[]>([]);

export async function loadTableData() {
  try {
    loading.value = true;
    const pageData = await userApi.page(params);
    gridOptions.page!.total = pageData.total;
    tableData.value = pageData.rows;
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : "加载失败");
  } finally {
    loading.value = false;
  }
}

export const selectRows = ref<UserOutputDTO[]>([]);

export async function handleBatchDelete() {
  if (!selectRows.value?.length) {
    return
  }
  try {
    loading.value = true
    const idList = selectRows.value.map(it => it.id)
    for (const id of idList) {
      await userApi.delete(id)
    }
    await loadTableData()
    ElMessage.success('删除成功')
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '删除失败')
  } finally {
    loading.value = false
  }
}

export const operationType = ref<OperationType>("create");
export const currentRow = ref<UserOutputDTO>();
export const modalVisible = ref(false);

export async function handleEdit(row: UserOutputDTO) {
  try {
    loading.value = true;

    row.roleIdList = await userApi.getRoleIdList(row.id);
    row.deptIdList = await userApi.getDeptIdList(row.id);

    currentRow.value = row;
    operationType.value = "update";
    modalVisible.value = true;

  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : "查询绑定信息失败");
  } finally {
    loading.value = false;
  }

}

export function handleAdd() {
  currentRow.value = undefined;
  operationType.value = "create";
  modalVisible.value = true;
}

export async function handleDelete(row: UserOutputDTO) {
  try {
    loading.value = true;
    await userApi.delete(row.id)
    await loadTableData()
    ElMessage.success('删除成功')
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '删除失败')
  } finally {
    loading.value = false;
  }
}

export async function handleModalConfirm(param: UserAddDTO & UserUpdateDTO) {
  try {
    loading.value = true;
    if (operationType.value === "create") {
      param.password = SparkMD5.hash(param.password);
      await userApi.add(param);
    } else if (operationType.value === "update") {
      await userApi.update(param);
    }
    await loadTableData();
    modalVisible.value = false;
    ElMessage.success("操作成功");
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : "操作失败");
  } finally {
    loading.value = false;
  }
}
