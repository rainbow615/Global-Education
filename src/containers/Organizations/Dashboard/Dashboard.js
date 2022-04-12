import React from 'react'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Container } from '../../../components/CommonComponent'
import { DashboardContainer } from './styles'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const { state } = useLocation()

  const breadCrumb = [
    {
      title: 'Organizations',
    },
    {
      title: state.name,
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <DashboardContainer></DashboardContainer>
      </Container>
    </React.Fragment>
  )
}

export default Dashboard
