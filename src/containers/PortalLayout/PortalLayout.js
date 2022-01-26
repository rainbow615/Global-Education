import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd'

import PortalHeader from './PortalHeader'
import PortalSidebar from './PortalSidebar'
import { getConfirmLogin } from '../../utils/cookie'
import { Root, MainView } from './styles'

const PortalLayout = () => {
  const location = useLocation()
  const isAuthenticated = !!getConfirmLogin()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return (
    <Root>
      <PortalHeader />
      <Layout>
        <PortalSidebar />
        <Layout>
          <MainView>
            <Outlet />
          </MainView>
        </Layout>
      </Layout>
    </Root>
  )
}

export default PortalLayout
