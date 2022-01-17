import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd'

import PortalHeader from './PortalHeader'
import { getToken } from '../../utils/cookie'

import './styles.scss'

const { Content } = Layout

const PortalLayout = () => {
  const location = useLocation()
  const isAuthenticated = !!getToken()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return (
    <Layout className="portal-layout">
      <PortalHeader />
      <Content className="portal-content">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default PortalLayout
