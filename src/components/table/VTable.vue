<template>
  <div style="width: 100%; height: 100%; ">
    <div v-if="props.toolbar" style="width: 100%; height: 32px; margin-bottom: 6px;display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; flex-direction: row; align-items: center">
        <slot name="buttons"></slot>
      </div>
      <div>
        <slot name="tools"></slot>
        <column-config/>
      </div>
    </div>
    <div style="width: 100%; " :style="{ height: tableHeight }">
      <el-table ref="tableRef" v-bind="props">
        <v-table-column
          v-for="column in effectiveColumns"
          :column="column"
          :key="column!.id!"
        >
          <template v-if="column.slot" #[column.slot]="scope">
            <slot :name="column.slot" v-bind="scope"></slot>
          </template>
        </v-table-column>
      </el-table>
    </div>
    <div v-if="props.pagination" style="margin-top: 6px" >
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :small="props.size === 'small'"
        :total="props.page!.total"
        v-model:current-page="props.page!.pageIdx"
        v-model:page-size="props.page!.pageSize"
        :page-sizes="props.page!.pageSizes"
        @size-change="val => $emit('pageChange', 'size', val)"
        @current-change="val => $emit('pageChange', 'index', val)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { TableColumnDefinition, useTableHook, VTableProps } from "@/components/table/utils/types";
import { ElTable, TableInstance, ElPagination } from "element-plus";
import { computed, onMounted, provide, ref } from "vue";
import VTableColumn from "@/components/table/VTableColumn.vue";
import ColumnConfig from "@/components/table/ColumnConfig.vue";
import { flattenTree } from "@/utils/common";

const props = withDefaults(defineProps<VTableProps>(), {
  showHeader: true,
  stripe: true,
  border: true,
  fit: true,
  toolbar: false,
  draggable: false,
  pagination: false,
})

if (props.draggable && !props.rowKey) {
  console.error("启用拖拽排序，必须设置rowKey")
}

const tableHeight = computed(() => {
  let subHeight = 0
  if (props.toolbar) {
    subHeight = 32 + 6
  }
  if (props.pagination) {
    if (props.size === 'small') {
      subHeight += 24 + 6
    } else {
      subHeight += 32 + 6
    }
  }
  return `calc(100% - ${subHeight}px)`
})

const tableRef = ref<TableInstance>()

const context = useTableHook(tableRef)

const effectiveColumns = ref<TableColumnDefinition<any>[]>([])

onMounted(() => {
  const arr: TableColumnDefinition<any>[] = []
  // @ts-ignore
  const items: TableColumnDefinition<any>[] = flattenTree(props.columns)
  // @ts-ignore
  let i = 1
  items.forEach(it => it.id = i++)

  for (let column of (props.columns || [])) {
    if (!!column) {
      arr.push(column)
    }
  }
  effectiveColumns.value = arr
})

provide('effectiveColumns', effectiveColumns)

console.log('effectiveColumns', effectiveColumns.value);


defineExpose({
  tableRef,
  ...context,
})

</script>

<style scoped>

</style>
