<template>
  <el-popover
      :visible="visible"
      popper-style="width: 720px; height: 480px"
      trigger="click"
      @after-enter="handleAfterEnter"
  >
    <div style="width: 100%; height: 100%;">

      <div style="width: 100%; height: calc(100% - 36px)">
        <el-table
            ref="tableRef"
            style="width: 100%; height: 100%;"
            row-key="id"
            :data="dragColumns"
            stripe
            border
            default-expand-all
            size="small"
        >
          <el-table-column width="50" align="center" header-align="center" :resizable="false" type="index">
            <template #default>
            <span style="cursor: move" class="drag-trigger">
              <el-icon><Resize/></el-icon>
            </span>
            </template>
          </el-table-column>
          <el-table-column prop="label" label="标题" />
          <el-table-column prop="fixed" width="150" label="固定" align="center" header-align="center">
            <template #default="scope">
              <el-radio-group v-model="scope.row.fixed" size="small">
                <el-radio-button :label="false">No</el-radio-button>
                <el-radio-button label="left">
                  <s-v-g-icon name="Left" style="width: 1em; height: 1em" />
                </el-radio-button>
                <el-radio-button label="right">
                  <s-v-g-icon name="Right" style="width: 1em; height: 1em" />
                </el-radio-button>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="width" width="80" label="宽度" align="center" header-align="center">
            <template #default="scope">
              <el-input v-model="scope.row.width" :controls="false" style="width: 100% " size="small" />
            </template>
          </el-table-column>
          <el-table-column prop="sortable" width="80" label="排序" align="center" header-align="center">
            <template #default="scope">
              <el-switch v-model="scope.row.sortable" size="small" />
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div style="height: 24px; margin-top: 12px">
        <el-button size="small">重置</el-button>
        <el-button type="primary" size="small" @click="visible = false">确定</el-button>
      </div>
    </div>
    <template #reference>
      <el-button :icon="Menu" circle plain @click="visible = !visible"></el-button>
    </template>
  </el-popover>

</template>
<script setup lang="ts">
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPopover,
  TableInstance,
  ElInput,
  ElSwitch,
  ElRadioGroup,
  ElRadioButton,
  ElIcon,
} from "element-plus";
import { inject, nextTick, onUnmounted, reactive, Ref, ref, shallowRef, toRaw } from "vue";
import { TableColumnDefinition } from "@/components/table/utils/types";
import { Menu } from "@element-plus/icons-vue";
import SVGIcon from "@/components/common/SVGIcon.vue";
import Sortable, { SortableEvent } from "sortablejs";
import { flattenTree, getTreeItemPath } from "@/utils/common";
import Resize from '@/assets/icons/Resize.svg'

const tableRef = ref<TableInstance>()
const visible = ref(false)
const columns = inject<Ref<TableColumnDefinition<any>[]>>('effectiveColumns')!
const dragColumns = ref<TableColumnDefinition<any>[]>([])



function handleAfterEnter() {
  const arr: TableColumnDefinition<any>[] = []
  for (const column of (columns?.value || [])) {
    if (!!column) {
      arr.push(toRaw(column))
    }
  }
  console.log('end arr', arr);
  dragColumns.value = arr

  nextTick(initSortable)


}

const rowMap = new Map<string, TableColumnDefinition<any>>()

const sortable = shallowRef<Sortable>()
function initSortable() {
  const el = tableRef.value?.$el.querySelector("table.el-table__body tbody")
  if (!el) return

  const items = flattenTree(dragColumns.value)
  rowMap.clear()
  items.forEach(it => rowMap.set(String(it.id), toRaw(it)))

  const rows = el.querySelectorAll("tr.el-table__row")
  console.log(rows);
  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      rows.item(i).setAttribute("data-id", String(items[i].id))
    }
  }

  sortable.value = Sortable.create(el, {
    sort: true,
    animation: 150,
    handle: 'span.drag-trigger',
    dataIdAttr: 'data-id',
    onMove(ev) {
      // console.log('move', ev);
      const rowId = ev.related.getAttribute('data-id')!
      const row = rowMap.get(rowId)
      if (row?.children?.length && ev.willInsertAfter) {
        // 禁止拖动到父节点 的下面
        return false
      }
      const path = getTreeItemPath(dragColumns.value, 'id', Number(rowId), false)?.map(it => it.id).join() || ''
      const fromRowId = ev.dragged.getAttribute('data-id')!

      const fromRow = rowMap.get(fromRowId)
      if (fromRow?.children?.length) {
        // 禁止拖动一整颗树
        return false
      }

      const fromPath = getTreeItemPath(dragColumns.value, 'id', Number(fromRowId), false)?.map(it => it.id).join() || ''
      // console.log('move rowId', rowId, fromRowId);
      // console.log('move path', path, fromPath, path === fromPath);
      if (path !== fromPath) {
        return false
      }
      return true

    },
    onEnd: handleDragEnd
  })
}

onUnmounted(() => {
  !!sortable.value && sortable.value.destroy()
})

function handleDragEnd(ev: SortableEvent) {
  const sortList = sortable.value?.toArray()
  console.log('drag end', sortList);
}

function handleNodeDragSucc(dragNode: any, targetNode: any, type: 'inner' | 'prev' | 'next', event: DragEvent) {
  console.log('dragColumns', dragColumns);
  columns.value = dragColumns.value
  const arr = []
  for (const elem of dragColumns.value) {
    arr.push(reactive(elem))
  }
  columns.value = arr
  console.log('columns', columns.value);
}

function allowDrop(draggingNode: any, dropNode: any, type: 'inner' | 'prev' | 'next') {
  // console.log(draggingNode, dropNode);
  return draggingNode.parent === dropNode.parent &&
      type !== 'inner';// &&
      // !['selection', 'expand', 'index'].includes(draggingNode.data.type) && // 不能拖动选择列，扩展列
      // !['selection', 'expand', 'index'].includes(dropNode.data.type) // 不能拖动到选择列、扩展列的前面
  ;
}
</script>
<style scoped>

</style>