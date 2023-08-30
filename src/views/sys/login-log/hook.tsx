import { TableColumnDefinition } from "@/components/table/utils/types";
import { UserLoginLogOutputDTO } from "@/api/sys/login-log/types";

export const columns: TableColumnDefinition<UserLoginLogOutputDTO>[] = ([
  // { type: "selection", align: "center", headerAlign: "center", width: '50' },
  { type: "index", align: "center", headerAlign: "center", label: "#", width: '50' },
  { prop: "username", align: "left", headerAlign: "left", label: "用户名" },
  { prop: "nickname", align: "left", headerAlign: "left", label: "昵称",   },
  // { prop: "loginType", align: "center", headerAlign: "center", label: "登录类型", width: '60'  },
  { prop: "loginIp", align: "center", headerAlign: "center", label: "登录IP", width: '150'  },
  { prop: "createTime", align: "center", headerAlign: "center", label: "登录时间", width: '200'  },
])

