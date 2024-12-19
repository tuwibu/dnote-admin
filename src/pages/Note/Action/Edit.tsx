import { EditOutlined } from '@ant-design/icons'
import { useTable } from '@contexts/TableContext'
import { Tooltip } from '@fluentui/react-components'
import { ItemProps } from '@typings/datatable'
import { Button, Col, Form, Input, Modal, Row, message } from 'antd'
import React, { useState } from 'react'
import { API, NoteState, TABLE_NAME } from '../constant'
import { isDarkMode } from '@redux/reducers/appSlice'
import { useAppSelector } from '@redux/hooks'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode'

const Edit: React.FC<ItemProps<NoteState>> = (props) => {
  const { themeMode } = useAppSelector((state) => state.app)
  const darkMode = isDarkMode(themeMode)
  const { item } = props
  const { reload } = useTable()
  const initialValues = {
    ...item
  }

  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const onSubmit = async (values: NoteState) => {
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
          {/* <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 20, maxRows: 20 }} />
          </Form.Item> */}
          <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please input!' }]}>
            <CodeMirror
              basicSetup={{
                lineNumbers: true,
                tabSize: 2
              }}
              height="500px"
              width="100%"
              theme={darkMode ? vscodeDark : vscodeLight}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Edit
