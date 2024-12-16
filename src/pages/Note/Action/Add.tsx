import { useTable } from '@contexts/TableContext'
import { Add16Regular } from '@fluentui/react-icons'
import { Button, Col, Form, Input, Modal, Row, message } from 'antd'
import { useState } from 'react'
import { API, TABLE_NAME, NoteState } from '../constant'

export const Add = () => {
  const { reload } = useTable()
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const initialValues = {}

  const onSubmit = async (values: NoteState) => {
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
        width={800}
      >
        <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Password" name="password">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 20, maxRows: 20 }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Add
