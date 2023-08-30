<template>

  <el-table-column v-bind="options">
    <template v-if="column.children?.length" #default>
      <v-table-column
        v-for="item in column.children"
        :column="item"
        :key="item.id"
      />
    </template>

    <template v-else-if="column.slot" #default="scope">
      <slot :name="column.slot" v-bind="scope"></slot>
    </template>
    <template v-else-if="column.cellRender" #default="scope">
      <component :is="column.cellRender(scope.row, scope.column, scope.index)"/>
    </template>
    <template v-if="column.headerRender" #header="scope">
      <component :is="column.headerRender(scope.column, scope.$index)"/>
    </template>
  </el-table-column>

</template>
<script setup lang="ts">
import { TableColumnDefinition } from "@/components/table/utils/types";
import { ElTableColumn } from 'element-plus'
import { computed } from "vue";

const props = defineProps<{
  column: Partial<TableColumnDefinition<any>>
}>()

const options = computed(() => {
  const {
    children, slot, cellRender, headerRender,
    ...attrs
  } = props.column
  return attrs;
})
</script>
