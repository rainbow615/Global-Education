import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Card } from 'antd'

import './styles.scss'
import { getToken } from '../../utils/cookie'

const AuthLayout = () => {
  const { state } = useLocation()
  const isAuthenticated = !!getToken()

  if (isAuthenticated) {
    return <Navigate to={state?.from?.pathname || '/home'} />
  }

  return (
    <div className="auth-layout">
      <Card className="form-container">
        <Outlet />
      </Card>
    </div>
  )
}

export default AuthLayout
