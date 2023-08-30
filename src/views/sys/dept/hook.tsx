import { TableColumnDefinition } from "@/components/table/utils/types";
import DictInput from "@/components/dict/DictInput.vue";
import { DepartmentOutputDTO } from "@/api/sys/dept/types";

export const columns = [
  {
    type: "index",
    width: 50,
    label: '#',
    align: "center",
    headerAlign: "center"
  },
  {
    prop: "name",
    label: "名称",
    minWidth: 200,
  },
  {
    prop: "orderNo",
    label: "排序",
    width: 60,
    align: "center",
    headerAlign: "center"
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
] as TableColumnDefinition<DepartmentOutputDTO>[];
