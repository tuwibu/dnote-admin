import { SearchOutlined } from '@ant-design/icons'
import { useDebounce } from '@hooks/useDebounce'
import { InitalState } from '@typings/datatable'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

export interface SearchProps {
  setState: React.Dispatch<React.SetStateAction<InitalState>>
  searchColumns: string[]
}

const SearchDatatable: React.FC<SearchProps> = (props) => {
  const { setState, searchColumns } = props
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      if (setState)
        setState((prevState) => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            keyword: debouncedSearchTerm
          },
          pagination: {
            ...prevState.pagination,
            current: 1
          },
          updated: prevState.updated + 1
        }))
    } else {
      if (setState)
        setState((prevState) => ({
          ...prevState,
          filters: {
            ...prevState.filters,
            keyword: ''
          },
          pagination: {
            ...prevState.pagination,
            current: 1
          },
          updated: prevState.updated + 1
        }))
    }
  }, [debouncedSearchTerm])

  return (
    <>
      <Input
        placeholder={`${searchColumns.join(', ')}...`}
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '250px'
        }}
      />
    </>
  )
}

export default SearchDatatable
