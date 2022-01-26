import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd'

import PortalHeader from './PortalHeader'
import { getConfirmLogin } from '../../utils/cookie'
// import { Root } from './styles'
import './styles.scss'

const { Content } = Layout

const PortalLayout = () => {
  const location = useLocation()
  const isAuthenticated = !!getConfirmLogin()

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
