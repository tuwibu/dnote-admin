import { SortOrder } from 'antd/es/table/interface'

export type Key = React.Key

export type FilterState = {
  text: string | JSX.Element
  value: any
}[]

export type OptionState = {
  label: string | JSX.Element
  value: string | boolean | number
  disabled?: boolean
}[]

export type InitalState<TData = any> = {
  data: TData[]
  loading: boolean
  updated: number
  pagination: {
    current: number
    pageSize: number
    pageSizeOptions: number[]
    showSizeChanger: boolean
  }
  filters?: {
    keyword?: string
    [key: string]: any
  }
  sort?: {
    order?: SortOrder
    field?: Key | readonly Key[]
  }
  selectedRowKeys: React.Key[]
}

export interface IAjax {
  field?: Key | readonly Key[]
  order?: SortOrder
  pageSize: number | string
  current: number | string
  searchColumn: ColumnState
  search?: {
    [key: string]: any
  }
}

export interface ResponseAjax<TData> {
  success: number
  data?: TData[]
  recordsTotal?: number
  recordsFiltered?: number
  message?: string
}

export interface AddProps {
  onReload: () => void
}

export interface ItemProps<TData = any> {
  isModal?: boolean
  item: TData
}

export interface ActiveProps<TData = any> {
  item: TData
  type: string
}
