declare interface PageQueryDTO {
  pageIdx: number;
  pageSize: number;
}

declare interface TableData<T> {
  data: T[]
  height: string | number | import("vue").ComputedRef<string | number>
  loading: boolean
}

declare interface PageData<T, D = any> {
  pageIdx: number
  pageSize: number
  total: number
  rows: T[]
  additional?: D
}

declare interface PageTableData<T> {
  pageIdx: number
  pageSize: number
  total: number
  tableData: TableData<T>
}

declare interface DialogInfo<T> {
  visible: boolean
  formData: T
  title: string
  loading: boolean
}

declare interface Tree {
  children?: this[]
}

declare type FunctionParams<T> = T extends (params: infer P) => any ? P : never;

declare type OperationType = 'create' | 'update'