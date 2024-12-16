import { DeleteOutlined } from '@ant-design/icons'
import { useTable } from '@contexts/TableContext'
import { Button, message, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { useTableModal } from '@contexts/TableModalContext'

export interface DeleteProps<TData = any> {
  isModal?: boolean
  item: TData
  api: any
  tableName: string
}

const DeleteDatatable: React.FC<DeleteProps> = (props) => {
  const { item, api, tableName, isModal } = props
  const { reload } = isModal ? useTableModal() : useTable()
  const [loading, setLoading] = useState(false)

  const confirm = async () => {
    try {
      setLoading(true)
      await api.deleteItem(item.id)
      message.open({
        type: 'success',
        content: `Deleted ${tableName} successfully`
      })
      reload()
    } catch (ex) {
      const reason = ex?.response?.data?.message || ex?.message
      message.open({
        type: 'error',
        content: reason
          ? `Cannot delete ${tableName.toLowerCase()}: ${reason}`
          : 'An error occurred. Please try again later'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Popconfirm title="Are you sure?" onConfirm={confirm} okText="Yes" cancelText="No">
        <Button danger icon={<DeleteOutlined />} loading={loading} />
      </Popconfirm>
    </>
  )
}

export default DeleteDatatable
