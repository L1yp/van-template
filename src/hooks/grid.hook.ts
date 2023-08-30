import { TableColumnDefinition, VTableInstance, VTableProps } from "@/components/table/utils/types";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import BaseApi from "@/api/base-api";



interface HookParam<T, QueryParam, AddDTO, UpdateDTO> {
  columns: TableColumnDefinition<T>[]
  tableProps?: VTableProps

  queryParam?: QueryParam & PageQueryDTO

  beforeModalVisible?: (param?: T) => Promise<void> | void
  afterModalConfirm?: () => Promise<void> | void
  afterLoadData?: (list: T[]) => Promise<T[] | void>
  api: BaseApi<T, QueryParam, AddDTO, UpdateDTO>
}


export function useTableHook<T, QueryParam = any, AddDTO = any, UpdateDTO = any>(param: HookParam<T, QueryParam, AddDTO, UpdateDTO>) {

  const {
    columns,
    queryParam,
    afterLoadData,
    api,
    tableProps = {},
    beforeModalVisible,
    afterModalConfirm,
  } = param

  if (tableProps.pagination && !tableProps.onPageChange) {
    tableProps.onPageChange = loadTableData
  }


  const gridOptions = reactive({
    columns,
    toolbar: true,
    pagination: false,
    border: true,
    height: "100%",
    rowKey: 'id',
    rowStyle: (row) => ({
      cursor: 'pointer'
    }),
    ...tableProps
  }) as VTableProps<T>;

  const tableRef = ref<VTableInstance>();

  function setTableRef(el: any) {
    tableRef.value = el;
  }

  const loading = ref(false);

  const tableData = ref<T[]>([]);

  async function loadTableData() {
    try {
      loading.value = true;
      let data = []
      if (gridOptions.pagination) {
        let pageParam: any = queryParam
        if (!queryParam) {
          pageParam = {
            pageIdx: tableProps?.page?.pageIdx || 1,
            pageSize: tableProps?.page?.pageSize || 20,
          }
        }
        const pageData = await api.page(pageParam!)
        gridOptions.page!.total = pageData.total
        data = pageData.rows
      } else {
        data = await api.list(queryParam);
      }

      if (afterLoadData) {
        const result = await afterLoadData(data)
        if (result) {
          tableData.value = reactive(result)
        } else {
          tableData.value = reactive(data)
        }
      } else {
        tableData.value = reactive(data)
      }

    } catch (e) {
      console.error(e);
      ElMessage.error(e instanceof Error ? e.message : "加载失败");
    } finally {
      loading.value = false;
    }
  }

  const selectRows = ref<T[]>([]);

  async function handleBatchDelete() {
    if (!selectRows.value?.length) {
      return
    }
    try {
      loading.value = true
      // @ts-ignore
      const idList = selectRows.value.map(it => it['id'])
      for (const id of idList) {
        await api.delete(id)
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

  const operationType = ref<OperationType>("create");
  const currentRow = ref<T>();
  const modalVisible = ref(false);

  async function handleEdit(row: T) {
    try {
      loading.value = true
      beforeModalVisible && await beforeModalVisible(row)
      currentRow.value = row;
      operationType.value = "update";
      modalVisible.value = true;
    } catch (e) {
      ElMessage.error(e instanceof Error ? e.message : '发生错误')
    } finally {
      loading.value = false
    }

  }

  async function handleAdd() {
    try {
      loading.value = true
      beforeModalVisible && await beforeModalVisible()
      currentRow.value = undefined;
      operationType.value = "create";
      modalVisible.value = true;
    } catch (e) {
      ElMessage.error(e instanceof Error ? e.message : '发生错误')
    } finally {
      loading.value = false
    }
  }

  async function handleDelete(id: string) {
    try {
      loading.value = true;
      await api.delete(id)
      await loadTableData()
      ElMessage.success('删除成功')
    } catch (e) {
      console.error(e);
      ElMessage.error(e instanceof Error ? e.message : '删除失败')
    } finally {
      loading.value = false;
    }
  }

  async function handleModalConfirm(param: AddDTO & UpdateDTO) {
    try {
      loading.value = true;
      if (operationType.value === "create") {
        await api.add(param);
      } else if (operationType.value === "update") {
        await api.update(param);
      }

      if (afterModalConfirm) {
        await afterModalConfirm()
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

  function expandOrShrinkAll<T extends Tree>(list: T[], expanded: boolean) {
    for (let item of list) {
      if (item.children && item.children.length > 0) {
        tableRef.value?.toggleRowExpansion(item, expanded);
        if (item.children && item.children.length > 0) {
          expandOrShrinkAll(item.children, expanded);
        }
      }
    }
  }

  return {
    gridOptions,
    tableRef,
    setTableRef,
    loading,
    tableData,
    loadTableData,
    selectRows,
    handleBatchDelete,
    operationType,
    currentRow,
    modalVisible,
    handleEdit, handleAdd, handleDelete, handleModalConfirm,
    expandOrShrinkAll,
  }

}

