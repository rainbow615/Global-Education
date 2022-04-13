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

  function generateLinkProps(to) {
    return {
      to,
      state: { orgId: state.id, orgName: state.name },
    }
  }

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <DashboardContainer>
          <Card
            title="Protocols"
            extra={
              <Link {...generateLinkProps('/organizations/protocols/list')}>
                <ArrowsAltOutlined />
              </Link>
            }
          ></Card>
          <Card
            title="Education"
            extra={
              <Link {...generateLinkProps('/organizations/local-education/list')}>
                <ArrowsAltOutlined />
              </Link>
            }
          ></Card>
          <Card
            title="Components"
            extra={
              <Link {...generateLinkProps('/organizations/components/list')}>
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
