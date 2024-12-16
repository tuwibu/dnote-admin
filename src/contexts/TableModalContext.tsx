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

interface TableModalContextProps {
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

const TableModalContext = createContext<TableModalContextProps | undefined>(undefined)

export const TableModalProvider = ({ children }) => {
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
    <TableModalContext.Provider
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
    </TableModalContext.Provider>
  )
}

export const useTableModal = () => {
  const context = useContext(TableModalContext)
  if (context === undefined) {
    throw new Error('useTableModal must be used within a TableModalContext')
  }
  return context
}
