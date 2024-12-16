import { ReloadOutlined, SettingOutlined } from '@ant-design/icons'
import SearchDatatable from '@components/Datatable/Search/SearchDatatable'
import { PAGE_SIZE } from '@configs/index'
import { useTable } from '@contexts/TableContext'
import type { MenuProps, TableColumnsType, TablePaginationConfig } from 'antd'
import {
  Table as AntdTable,
  TableProps as AntdTableProps,
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Space,
  Tooltip,
  message
} from 'antd'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface'
import React, { useEffect } from 'react'
import type { ResizeCallbackData } from 'react-resizable'
import { Resizable } from 'react-resizable'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { initTable, toggleColumnHidden } from '@redux/reducers/tableSlice'

const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void
    width: number
  }
) => {
  const { onResize, width, ...restProps } = props
  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export interface TableProps<TData = any> extends AntdTableProps {
  tableKey: string
  tableColumns: TableColumnsType<TData>
  api: any
  addComponent?: React.ReactNode
  actionComponent?: React.ReactNode
}

const Table: React.FC<TableProps> = (props) => {
  const { tableKey, tableColumns, api, addComponent, actionComponent } = props

  const { state, setState, reload, columns, setColumns, searchColumns } = useTable()

  const dispatch = useAppDispatch()
  const tables = useAppSelector((state) => state.table)

  if (!tables?.[tableKey]) {
    dispatch(initTable(tableKey))
  }

  const hiddenColumns = tables?.[tableKey] || []

  const handleResize: Function =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...columns]
      newColumns[index] = {
        ...newColumns[index],
        width: size.width
      }
      setColumns(newColumns)
    }

  const mergedColumns = columns
    .filter((column) => {
      return !hiddenColumns?.includes(String(column.key))
    })
    .map<TableColumnsType<any>[number]>((col, index) => ({
      ...col,
      onHeaderCell: (column: TableColumnsType<any>[number]) => ({
        width: column.width,
        onResize: handleResize(index) as React.ReactEventHandler<any>
      })
    }))

  const fetchData = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }))
      const response = await api.getAll({
        pageSize: state.pagination.pageSize,
        current: state.pagination.current,
        searchColumn: searchColumns,
        search: state?.filters,
        field: state.sort?.field,
        order: state.sort?.order
      })
      setState((prevState) => ({
        ...prevState,
        data: response.data.data,
        selectedRowKeys: [],
        pagination: {
          ...prevState.pagination,
          total: response.data.recordsFiltered
        }
      }))
    } catch (ex: any) {
      message.open({
        type: 'error',
        content: ex?.response?.data?.message || ex?.message || 'Đã xảy ra lỗi'
      })
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false
      }))
    }
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        ...filters
      },
      pagination: {
        ...prevState.pagination,
        current: pagination.current || 1,
        pageSize: pagination.pageSize || PAGE_SIZE
      },
      sort: {
        field: (sorter as SorterResult<any>)?.field,
        order: (sorter as SorterResult<any>)?.order
      },
      updated: prevState.updated + 1
    }))
  }

  const handleColumnVisibility = (column: string) => {
    dispatch(
      toggleColumnHidden({
        table: tableKey,
        column
      })
    )
  }

  useEffect(() => {
    if (state.updated > 0) {
      fetchData()
    }
  }, [state.updated])

  const items: MenuProps['items'] = tableColumns.map((column) => ({
    key: column.key,
    label: (
      <Checkbox
        checked={!hiddenColumns?.includes(String(column.key))}
        onChange={() => handleColumnVisibility(String(column.key))}
      >
        {String(column.title)}
      </Checkbox>
    )
  }))

  return (
    <>
      <Flex justify="space-between" align="flex-start" className="row-actions">
        <Space>
          <Tooltip title="Reload">
            <Button icon={<ReloadOutlined />} onClick={reload} loading={state.loading} />
          </Tooltip>
          <Dropdown menu={{ items }}>
            <Button icon={<SettingOutlined />} />
          </Dropdown>
          <SearchDatatable searchColumns={searchColumns} setState={setState} />
        </Space>
        <Space>
          {actionComponent}
          {addComponent}
        </Space>
      </Flex>
      <AntdTable
        key={`table-${tableKey}`}
        components={{
          header: {
            cell: ResizableTitle
          }
        }}
        loading={state.loading}
        onChange={handleTableChange}
        columns={mergedColumns}
        dataSource={state.data}
        pagination={state.pagination}
        tableLayout="auto"
        rowKey="id"
        scroll={{
          x: 1000
        }}
        rowSelection={{
          selectedRowKeys: state.selectedRowKeys,
          onChange: (key: React.Key[]) => {
            setState((prevState) => ({
              ...prevState,
              selectedRowKeys: key
            }))
          }
        }}
      />
    </>
  )
}

export default Table
