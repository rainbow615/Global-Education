import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getConfirmLogin } from '../../utils/cookie'
import { Root } from './styles'

const AuthLayout = () => {
  const { state } = useLocation()
  const isAuthenticated = !!getConfirmLogin()

  if (isAuthenticated) {
    return <Navigate to={state?.from?.pathname || '/home'} />
  }

  return (
    <Root>
      <Outlet />
    </Root>
  )
}

export default AuthLayout
