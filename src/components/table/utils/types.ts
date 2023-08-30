import { TableColumnCtx, TableInstance, TableProps } from "element-plus";
import { Ref, VNode } from "vue";
import VTable from "@/components/table/VTable.vue";

export type ColumnAlign = 'left' | 'center' | 'right'

export type VTableInstance = InstanceType<typeof VTable>

type IndexFunc = (index: number) => number

type RenderHeaderFunc<T> = (column: TableColumnCtx<T>, index: number) => VNode
type SortFunc<T> = (a: T, b: T) => number
type SortByFunc<T> = (row: T, index: number) => string
type SortDirection = 'ascending' | 'descending' | null
type FormatterFunc<T> = (row: T, column: TableColumnCtx<T>, cellValue: any, index: number) => string | VNode

type ElTableColumnProp<T> = {
  type: 'selection' | 'index' | 'expand'
  label: string
  className: string
  labelClassName: string

  property: string
  prop: string

  width: string | number
  minWidth: string | number


  index: number | IndexFunc
  columnKey: string

  fixed: 'left' | 'right' | true

  /**
   * error.ts:14 ElementPlusError: [TableColumn] Comparing to render-header, scoped-slot header is easier to use.
   * We recommend users to use scoped-slot header.
   */
  // renderHeader: RenderHeaderFunc<T>
  sortable: boolean // false
  sortMethod: SortFunc<T>
  sortBy: string | string[] | SortByFunc<T>
  sortOrders: SortDirection[]
  resizable: boolean // true
  formatter: FormatterFunc<T>
  showOverflowTooltip: boolean | Partial<Pick<import("element-plus/es/components").ElTooltipProps, "offset" | "effect" | "placement" | "popperClass" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "showArrow">>

  align: ColumnAlign // left
  headerAlign: ColumnAlign

  selectable: (row: T, index: number) => boolean
  reserveSelection: boolean // false
  filters: Array<{text: string; value: string}>
  /**
   * 与Tooltip的placement属性相同
   */
  filterPlacement: string
  filterMultiple: boolean // true
  // // 同一行调用多次，返回一次true就展示
  filterMethod: (value: any, row: T, column: TableColumnCtx<T>) => boolean
  filteredValue: any[]
}

export interface TableColumnDefinition<T> extends Partial<ElTableColumnProp<T>> {
  id?: number
  slot?: string
  cellRender?: (row: T, column: TableColumnDefinition<T>, index: number) => VNode
  headerRender?: RenderHeaderFunc<T>
  children?: this[]
}

export type SortChangeParam<T> = {
  column: TableColumnCtx<T>
  prop: string
  sort: string
}

export interface VTableEmits<T = any> {
  onSelectionChange(selection: T[]): void
  onCellMouseEnter(row: T, column: TableColumnCtx<T>, cell: HTMLDivElement, event: MouseEvent): void
  onCellMouseLeave(row: T, column: TableColumnCtx<T>, cell: HTMLDivElement, event: MouseEvent): void
  onCellClick(row: T, column: TableColumnCtx<T>, cell: HTMLDivElement, event: PointerEvent): void
  onCellDblclick(row: T, column: TableColumnCtx<T>, cell: HTMLDivElement, event: PointerEvent): void
  onCellContextmenu(row: T, column: TableColumnCtx<T>, cell: HTMLDivElement, event: PointerEvent): void
  onRowClick(row: T, column: TableColumnCtx<T>, event: PointerEvent): void
  onRowContextmenu(row: T, column: TableColumnCtx<T>, event: PointerEvent): void
  onRowDblclick(row: T, column: TableColumnCtx<T>, event: PointerEvent): void
  onHeaderClick(column: TableColumnCtx<T>, event: PointerEvent): void
  onHeaderContextmenu(column: TableColumnCtx<T>, event: PointerEvent): void
  onPageChange(type: 'index' | 'size', val: number): void
}

export interface Page {
  pageIdx: number
  pageSize: number
  pageSizes: number[]
  total: number
}

export type VTableProps<T = any> = {
  columns?: Array<TableColumnDefinition<T> | undefined>
  toolbar?: boolean
  draggable?: boolean
  pagination?: boolean
  page?: Page
} & Partial<TableProps<T>> & Partial<VTableEmits<T>>

export function useTableHook<T = any>(tableRef: Ref<TableInstance | undefined>) {
  function toggleRowSelection(row: T, selected?: boolean) {
    // @ts-ignore
    tableRef.value?.toggleRowSelection(row, selected)
  }

  function clearSelection() {
    // @ts-ignore
    tableRef.value?.clearSelection()
  }

  function getSelectionRows(): T[] {
    return tableRef.value?.getSelectionRows()
  }

  function toggleAllSelection() {
    tableRef.value?.toggleAllSelection()
  }

  function toggleRowExpansion(row: T, expand?: boolean) {
    tableRef.value?.toggleRowExpansion(row, expand)
  }

  function setCurrentRow(row: T) {
    tableRef.value?.setCurrentRow(row)
  }

  function clearSort() {
    tableRef.value?.clearSort()
  }

  function clearFilter(columnKeys: string[]) {
    tableRef.value?.clearFilter(columnKeys)
  }

  function doLayout() {
    tableRef.value?.doLayout()
  }

  function sort(prop: string, order: string) {
    tableRef.value?.sort(prop, order)
  }

  function scrollTo(options: number | ScrollToOptions, yCoord?: number) {
    tableRef.value?.scrollTo(options, yCoord)
  }

  function setScrollTop(top: number) {
    tableRef.value?.setScrollTop(top)
  }

  function setScrollLeft(left: number) {
    tableRef.value?.setScrollLeft(left)
  }

  return {
    toggleRowSelection,
    clearSelection,
    getSelectionRows,
    toggleAllSelection,
    toggleRowExpansion,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
    scrollTo,
    setScrollTop,
    setScrollLeft,
  }

}
