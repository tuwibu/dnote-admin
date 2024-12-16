import { InitalState } from '@typings/datatable'
import { Switch, message } from 'antd'
import React, { useState } from 'react'

export interface ActiveProps {
  type: string
  api: any
  tableName: string
  item: any
  setState: React.Dispatch<React.SetStateAction<InitalState>>
}

const ActiveDatatable: React.FC<ActiveProps> = (props) => {
  const { item, type, api, tableName, setState } = props
  const [loading, setLoading] = useState<boolean>(false)
  const { id, [type]: value } = item

  const handleActiveChange = async (value: boolean, id: string) => {
    try {
      setLoading(true)
      await api.editItem(id, {
        [type]: Boolean(value)
      })
      message.open({
        type: 'success',
        content: `Updated ${tableName.toLowerCase()} successfully`
      })
      setState((prevState) => ({
        ...prevState,
        data: [...(prevState.data ? prevState.data : [])].map((item) => {
          if (item.id === id) {
            return {
              ...item,
              [type]: value
            }
          }
          return item
        })
      }))
    } catch (ex) {
      const reason = ex?.response?.data?.message || ex?.message
      message.open({
        type: 'error',
        content: reason
          ? `Cannot update ${tableName.toLowerCase()}: ${reason}`
          : 'An error occurred. Please try again later'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Switch
        checked={value}
        loading={loading}
        onChange={(checked) => handleActiveChange(checked, id)}
      />
    </>
  )
}

export default ActiveDatatable
