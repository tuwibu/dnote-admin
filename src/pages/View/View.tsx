import { makeStyles, tokens } from '@fluentui/react-components'
import Container from '@layouts/Container'
import { Button, Card, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiService from '@services/api.service'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setNotePassword } from '@redux/reducers/noteSlice'
import { NoteState } from '@pages/Note/constant'
import PageError from '@pages/Error/Error'

const useStyles = makeStyles({
  root: {
    marginTop: '50px',
    minHeight: 'calc(100dvh - 50px)',
    maxHeight: 'calc(100dvh - 50px)',
    overflowY: 'auto',

    '::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '20px'
    },

    '::-webkit-scrollbar-thumb': {
      width: '4px',
      background: '#898A8B',
      borderRadius: '20px'
    },

    '::-webkit-scrollbar-track': {
      width: '4px',
      borderRadius: '20px'
    },
    border: `1px solid ${tokens.colorNeutralStroke3}`,
    background: tokens.colorNeutralBackground2,
    boxSizing: 'border-box',
    flex: 1
  }
})

const PageView = () => {
  const styles = useStyles()
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  const { notePassword } = useAppSelector((state) => state.note)
  const [password, setPassword] = useState(notePassword?.[slug] || '')
  const [content, setContent] = useState('')
  const [name, setName] = useState('')
  const [needPassword, setNeedPassword] = useState(false)
  const [blockNote, setBlockNote] = useState(false)
  const [ok, setOk] = useState(false)

  const [form] = Form.useForm()

  const fetchInfo = async (password: string) => {
    try {
      const response = await apiService.getNote(slug, password)
      setContent(response.data.data.content)
      setName(response.data.data.name)
      setNeedPassword(false)
      dispatch(
        setNotePassword({
          slug,
          password
        })
      )
      setOk(true)
    } catch (ex) {
      if (ex?.response?.status === 401) {
        setNeedPassword(true)
        setOk(false)
        message.open({
          type: 'error',
          content: ex?.response?.data?.message || 'Password is incorrect'
        })
      }
      if (ex?.response?.status === 403) {
        setBlockNote(true)
        setOk(false)
      }
    }
  }

  const handleSave = async (data: Partial<NoteState>) => {
    try {
      await apiService.saveNote(slug, data)
      message.open({
        type: 'success',
        content: 'Save note successfully'
      })
    } catch (ex) {
      message.open({
        type: 'error',
        content: 'Failed to save note'
      })
    }
  }

  useEffect(() => {
    fetchInfo(password)
  }, [])

  // useEffect(() => {
  //   if (ok) {
  //     setInterval(() => {
  //       fetchInfo(password)
  //     }, 1000)
  //   }
  // }, [ok])

  return (
    <div className={styles.root}>
      <Container>
        {blockNote ? (
          <PageError />
        ) : (
          <Card title={name}>
            <Form
              layout="vertical"
              form={form}
              onFinish={() => {
                const values = form.getFieldsValue()
                if (needPassword) {
                  setPassword(values.password)
                  fetchInfo(values.password)
                } else {
                  handleSave({
                    name,
                    content,
                    password
                  })
                }
              }}
            >
              {needPassword ? (
                <>
                  <Form.Item name="password" label="Password">
                    <Input.Password />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Form.Item label="Name">
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Item>
                  <Form.Item label="Content">
                    <Input.TextArea
                      value={content}
                      autoSize={{ minRows: 20 }}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </>
              )}
            </Form>
          </Card>
        )}
      </Container>
    </div>
  )
}

export default PageView
