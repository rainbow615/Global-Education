import React from 'react'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Container } from '../../../components/CommonComponent'
import { DashboardContainer } from './styles'
import { Link, useLocation } from 'react-router-dom'
import { Card } from 'antd'
import { ArrowsAltOutlined } from '@ant-design/icons'

const Dashboard = () => {
  const { state } = useLocation()

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations',
    },
    {
      title: state.name,
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <DashboardContainer>
          <Card
            title="Protocols"
            extra={
              <Link
                to="/organizations/protocols/list"
                state={{ orgId: state.id, orgName: state.name }}
              >
                <ArrowsAltOutlined />
              </Link>
            }
          ></Card>
          <Card
            title="Education"
            extra={
              <Link
                to="/organizations/local-education/list"
                state={{ orgId: state.id, orgName: state.name }}
              >
                <ArrowsAltOutlined />
              </Link>
            }
          ></Card>
          <Card
            title="Components"
            extra={
              <Link
                to="/organizations/components/list"
                state={{ orgId: state.id, orgName: state.name }}
              >
                <ArrowsAltOutlined />
              </Link>
            }
          ></Card>
          <Card title="Activity"></Card>
        </DashboardContainer>
      </Container>
    </React.Fragment>
  )
}

export default Dashboard
