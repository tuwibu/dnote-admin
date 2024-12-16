import { DeleteOutlined } from '@ant-design/icons'
import ConfirmModal from '@components/ConfirmModal'
import { useTable } from '@contexts/TableContext'
import { message } from 'antd'
import React, { useState } from 'react'
import { useTableModal } from '@contexts/TableModalContext'

export interface ActionProps {
  isModal?: boolean
  api: any
  tableName: string
}

const ActionDeleteDatatable: React.FC<ActionProps> = (props) => {
  const { api, tableName, isModal } = props
  const { state, reload } = isModal ? useTableModal() : useTable()
  const ids = state.selectedRowKeys
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      if (ids && ids.length > 0) {
        let deletePromises = []
        for (let id of ids) {
          deletePromises.push(api.deleteItem(id))
        }
        const deleteResults = await Promise.allSettled(deletePromises)
        const successfulDeletes = deleteResults.filter(
          (result) => result.status === 'fulfilled' && result.value.data.success
        )
        message.open({
          type: 'success',
          content: `Deleted ${successfulDeletes.length} ${tableName.toLowerCase()} successfully`
        })
        reload()
      } else {
        message.open({
          type: 'error',
          content: `No ${tableName.toLowerCase()} selected to delete`
        })
      }
    } catch (ex) {
      message.open({
        type: 'error',
        content:
          ex?.response?.data?.message || ex?.message || 'An error occurred. Please try again later'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ConfirmModal
        content="Once you delete these items, you won't be able to restore them. Do you want to continue"
        label="Delete"
        title="Delete"
        icon={<DeleteOutlined />}
        onConfirm={handleDelete}
        loading={loading}
        disabled={!ids?.length}
      />
    </>
  )
}

export default ActionDeleteDatatable
