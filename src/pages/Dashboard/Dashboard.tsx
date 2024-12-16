import { DashboardOutlined } from '@ant-design/icons'
import Card from '@components/Card'
import Container from '@layouts/Container'

const PageDashboard = () => {
  return (
    <Container>
      <Card title="Dashboard" icon={<DashboardOutlined />}>
        <span>Dashboard</span>
      </Card>
    </Container>
  )
}

export default PageDashboard
