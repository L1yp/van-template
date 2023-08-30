import { TableColumnDefinition } from "@/components/table/utils/types";
import { RoleOutputDTO } from "@/api/sys/role/types";
import { reactive } from "vue";
import DictInput from "@/components/dict/DictInput.vue";

export const columns = reactive([
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
    prop: "name",
    label: "名称",
    minWidth: 200
  },
  {
    prop: "orderNo",
    label: "排序",
    width: 80,
    align: "center",
    headerAlign: "center",
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
    minWidth: 300,
    slot: "operation"
  }
]) as TableColumnDefinition<RoleOutputDTO>[]