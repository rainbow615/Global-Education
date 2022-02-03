import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

import { AuthLayout } from './containers/AuthLayout'
import { PortalLayout } from './containers/PortalLayout'
import { getConfirmLogin } from './utils/cookie'

// Page containers
const ForgotPassword = loadable(() => import('./containers/ForgotPassword'))
const Home = loadable(() => import('./containers/Home'))
const Privacy = loadable(() => import('./containers/Privacy'))
const Login = loadable(() => import('./containers/Login'))
const ResetPassword = loadable(() => import('./containers/ResetPassword'))
const Profile = loadable(() => import('./containers/Profile'))
const Jurisdictions = loadable(() => import('./containers/Jurisdictions'))
const Education = loadable(() => import('./containers/Education'))
const Pricing = loadable(() => import('./containers/Pricing'))
const Licenses = loadable(() => import('./containers/Licenses'))
const Users = loadable(() => import('./containers/Users'))

function App() {
  const isAuthenticated = !!getConfirmLogin()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/jurisdictions' : '/home'} />} />
      <Route path="home" element={<Home />} />
      <Route path="privacy" element={<Privacy />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="passwordreset" element={<ResetPassword />} />
      </Route>
      <Route element={<PortalLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="jurisdictions" element={<Jurisdictions />} />
        <Route path="education" element={<Education />} />
        <Route path="users" element={<Users />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="licenses" element={<Licenses />} />
      </Route>
    </Routes>
  )
}

export default App
