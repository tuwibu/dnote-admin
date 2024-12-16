import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons'
import { APP_NAME, APP_PREFIX_PATH } from '@configs/index'
import { makeStyles, tokens } from '@fluentui/react-components'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { loginSuccess, setFill } from '@redux/reducers/authSlice'
import authService from '@services/auth.service'
import { Button, Card, Col, Form, Image, Input, Row, Space, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const useStyles = makeStyles({
  root: {
    background: tokens.colorNeutralBackground4,
    marginTop: '50px',
    width: '100%'
  },

  leftContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 50px)'
  },

  rightContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 50px)'
  },

  cardLogin: {
    borderRadius: '0px',
    height: 'calc(100vh - 100px)',
    width: '100%',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  floatRight: {
    float: 'right'
  },

  imgLogo: {
    display: 'flex',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    margin: '0 auto',
    marginBottom: '20px'
  },

  row: {
    width: '100%'
  }
})

interface LoginPayload {
  username: string
  password: string
}

const PageLogin = () => {
  const dispatch = useAppDispatch()
  const [width, setWidth] = useState<number>(0)
  const { fill } = useAppSelector((state) => state.auth)
  const styles = useStyles()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const initialValues = {
    username: fill?.username || '',
    password: fill?.password || ''
  }

  const handleLogin = async (values: LoginPayload) => {
    try {
      setLoading(true)
      const response = await authService.login(values)
      if (response.data.success) {
        dispatch(setFill(values))
        dispatch(loginSuccess(response.data.data))
      } else {
        message.open({
          type: 'error',
          content: response.data.message || 'Đã xảy ra lỗi'
        })
      }
    } catch (ex) {
      message.open({
        type: 'error',
        content: ex?.response?.data?.message || ex?.message || 'Đã xảy ra lỗi'
      })
    } finally {
      setLoading(false)
    }
  }

  // check width of screen 800px

  useEffect(() => {
    // Function to update window width state
    const updateWidth = () => {
      setWidth(window.innerWidth)
    }

    // Add event listener for window resize
    window.addEventListener('resize', updateWidth)

    // Initial width update
    updateWidth()

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <div className={styles.root}>
      <Row className={styles.row}>
        <Col
          span={12}
          className={styles.leftContent}
          style={{
            display: width < 900 ? 'none' : 'flex'
          }}
        >
          <Space direction="vertical" align="center">
            <Image src={'/agency.png'} preview={false} />
            <Typography.Title>{APP_NAME}</Typography.Title>
          </Space>
        </Col>
        <Col span={width > 900 ? 12 : 24} className={styles.rightContent}>
          <Card className="card-login">
            <Space
              className="test"
              direction="vertical"
              align="center"
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              <div className={styles.imgLogo}>
                <img src="/logo.png" alt="app logo" />
              </div>
              <Typography.Title level={3}>Login Admin</Typography.Title>
              <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={handleLogin}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    form.submit()
                  }
                }}
              >
                <Form.Item name="username" rules={[{ required: true, message: 'Please input!' }]}>
                  <Input
                    autoComplete="off"
                    role="presentation"
                    placeholder="Username"
                    prefix={<UserOutlined />}
                    style={{
                      maxWidth: '400px'
                    }}
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input!' }]}>
                  <Input.Password
                    autoComplete="new-password"
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    required
                    style={{
                      maxWidth: '400px'
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={loading}
                    type="primary"
                    onClick={() => form.submit()}
                    block
                    style={{
                      maxWidth: '400px'
                    }}
                  >
                    Login
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Link to={APP_PREFIX_PATH} draggable={false}>
                    <Button type="link">Back to Home</Button>
                  </Link>
                </Form.Item>
              </Form>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PageLogin
