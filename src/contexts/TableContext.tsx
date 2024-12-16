import { PAGE_LIMIT, PAGE_SIZE } from '@configs/index'
import { InitalState } from '@typings/datatable'
import { ColumnsType } from 'antd/es/table'
import { createContext, useContext, useState } from 'react'

const initialState: InitalState = {
  data: [],
  loading: false,
  updated: 0,
  pagination: {
    current: 1,
    pageSize: PAGE_SIZE,
    pageSizeOptions: PAGE_LIMIT,
    showSizeChanger: true
  },
  selectedRowKeys: []
}

interface GlobalState {
  [key: string]: any
}

interface TableContextProps {
  state: InitalState
  columns: ColumnsType<any>
  searchColumns: string[]
  hiddenColumns: string[]
  globalData: GlobalState
  setState: React.Dispatch<React.SetStateAction<InitalState>>
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType<any>>>
  setSearchColumns: React.Dispatch<React.SetStateAction<string[]>>
  setHiddenColumns: React.Dispatch<React.SetStateAction<string[]>>
  setGlobalData: (data: GlobalState) => void
  reload: () => void
}

const TableContext = createContext<TableContextProps | undefined>(undefined)

export const TableProvider = ({ children }) => {
  const [state, setState] = useState<InitalState>(initialState)
  const [columns, setColumns] = useState<ColumnsType<any>>([])
  const [searchColumns, setSearchColumns] = useState<string[]>([])
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
  const [globalData, setGlobalData] = useState<GlobalState>({})

  const reload = () => {
    setState((prevState) => ({
      ...prevState,
      updated: prevState.updated + 1
    }))
  }

  return (
    <TableContext.Provider
      value={{
        state,
        columns,
        searchColumns,
        hiddenColumns,
        globalData,
        setState,
        setColumns,
        setSearchColumns,
        setHiddenColumns,
        setGlobalData,
        reload
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTable = () => {
  const context = useContext(TableContext)
  if (context === undefined) {
    throw new Error('useTable must be used within a TableContext')
  }
  return context
}
