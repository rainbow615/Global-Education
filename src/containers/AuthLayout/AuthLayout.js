import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getToken } from '../../utils/cookie'
import './styles.scss'

const AuthLayout = () => {
  const { state } = useLocation()
  const isAuthenticated = !!getToken()

  if (isAuthenticated) {
    return <Navigate to={state?.from?.pathname || '/home'} />
  }

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  )
}

export default AuthLayout
