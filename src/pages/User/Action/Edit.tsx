import { EditOutlined } from '@ant-design/icons'
import { useTable } from '@contexts/TableContext'
import { Tooltip } from '@fluentui/react-components'
import { ItemProps } from '@typings/datatable'
import { Button, Form, Input, Modal, message } from 'antd'
import React, { useState } from 'react'
import { API, TABLE_NAME, UserState } from '../constant'

const Edit: React.FC<ItemProps<UserState>> = (props) => {
  const { item } = props
  const { reload } = useTable()
  const initialValues = {
    ...item
  }

  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const onSubmit = async (values: UserState) => {
    try {
      setLoading(true)
      await API.editItem(item.id, values)
      message.open({
        type: 'success',
        content: `Updated ${TABLE_NAME.toLowerCase()} successfully`
      })
      setVisible(false)
      reload()
    } catch (ex) {
      const reason = ex?.response?.data?.message || ex?.message
      message.open({
        type: 'error',
        content: reason
          ? `Cannot update ${TABLE_NAME.toLowerCase()}: ${reason}`
          : 'An exception occurred. Please try again later'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Tooltip content="Edit" relationship="label" withArrow>
        <Button onClick={() => setVisible(true)} icon={<EditOutlined />} />
      </Tooltip>
      <Modal
        title={`Edit ${TABLE_NAME.toLowerCase()}`}
        open={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
        okText="Save"
        cancelText="Cancel"
        onOk={() => form.submit()}
        okButtonProps={{
          loading
        }}
        cancelButtonProps={{
          loading
        }}
      >
        <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Edit
