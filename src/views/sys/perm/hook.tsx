import { TableColumnDefinition } from "@/components/table/utils/types";
import { PermOutputDTO } from "@/api/sys/perm/types";

export const columns: TableColumnDefinition<PermOutputDTO>[] = ([
  { type: "selection", align: "center", headerAlign: "center", width: '50' },
  { prop: "name", align: "left", headerAlign: "left", label: "标题" },
  { type: "index", align: "center", headerAlign: "center", label: "#", width: '50' },
  { prop: "permKey", align: "left", headerAlign: "left", label: "标识", width: '200'  },
  { prop: "orderNo", align: "center", headerAlign: "center", label: "排序", width: '60'  },
  { label: "操作", align: "left", headerAlign: "left", slot: "operation" }
])

