/* @jsxImportSource vue */
import { TableColumnDefinition } from "@/components/table/utils/types";
import { formatMenuType, MenuOutputDTO } from "@/api/sys/menu/types";
import { ElButton, ElIcon, ElInput } from "element-plus";
import SVGIcon from "@/components/common/SVGIcon.vue";
import BoolDictInput from "@/components/dict/BoolDictInput.vue";
import DictInput from "@/components/dict/DictInput.vue";
import { reactive, ref } from "vue";

export const formData = reactive({
  nameKey: ''
})

console.log('formData.nameKey', formData.nameKey);

const nameKey = ref('')

export const columns: TableColumnDefinition<MenuOutputDTO>[] = reactive([
  { type: "selection", align: "center", headerAlign: "center", width: '50', label: '选择' },
  {
    headerAlign: "left",
    prop: '$nameKey',
    headerRender: () => (
      <ElInput v-model={nameKey.value}  />
    ),
    children: [
      {
        prop: "name", align: "left", headerAlign: "left", label: "标题"
      }
    ]
  },
  // { prop: "name", align: "left", headerAlign: "left", label: "标题" },
  { type: "index", prop: '$index', align: "center", headerAlign: "center", label: "#", width: '50' },
  {
    prop: "meta.icon", align: "center", headerAlign: "center", label: "图标", width: "60",
    cellRender: (row, column, index) => (
      <ElIcon>
        <SVGIcon name={row.meta.icon} />
      </ElIcon>
    )
  },
  {
    prop: '$nameKey2',
    headerRender: () => (
        <ElInput v-model={nameKey.value}  />
    ),
    children: [
      { prop: "type", align: "center", headerAlign: "center", label: "类型", width: '80', formatter: formatMenuType },
      { prop: "path", align: "left", headerAlign: "left", label: "路由" },
    ]
  },

  { prop: "component", align: "left", headerAlign: "left", label: "组件路径" },
  { prop: "orderNo", align: "center", headerAlign: "center", label: "排序", width: '60' },
  { prop: "meta.closeable", align: "center", headerAlign: "center", label: "允许关闭", width: '100',
    cellRender: (row, column, index) => (
      <BoolDictInput dictKey="yes.no" modelValue={Boolean(row.meta.closeable)} readonly />
    )
  },
  { prop: "status", align: "center", headerAlign: "center", label: "状态", width: '100',
    cellRender: (row, column, index) => (
      <DictInput dictKey="common.status" modelValue={row.status} readonly />
    )
  },
  { label: "操作", align: "left", headerAlign: "left", slot: "operation" }
])

