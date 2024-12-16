import { useTable } from '@contexts/TableContext'
import { Add16Regular } from '@fluentui/react-icons'
import { Button, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { API, TABLE_NAME, UserState } from '../constant'

export const Add = () => {
  const { reload } = useTable()
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const initialValues = {}

  const onSubmit = async (values: UserState) => {
    try {
      setLoading(true)
      await API.addItem(values)
      message.open({
        type: 'success',
        content: `Add ${TABLE_NAME.toLowerCase()} successfully`
      })
      setVisible(false)
      form.resetFields()
      reload()
    } catch (ex) {
      const reason = ex?.response?.data?.message || ex?.message
      message.open({
        type: 'error',
        content: reason
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button icon={<Add16Regular />} onClick={() => setVisible(true)} type="primary">
        Add
      </Button>
      <Modal
        title={`Add ${TABLE_NAME.toLowerCase()}`}
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

export default Add
