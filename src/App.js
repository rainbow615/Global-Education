import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

import { AuthLayout } from './containers/AuthLayout'
import { PortalLayout } from './containers/PortalLayout'

// Page containers
const ForgotPassword = loadable(() => import('./containers/ForgotPassword'))
const Home = loadable(() => import('./containers/Home'))
const Privacy = loadable(() => import('./containers/Privacy'))
const Login = loadable(() => import('./containers/Login'))
const ResetPassword = loadable(() => import('./containers/ResetPassword'))
const Jurisdictions = loadable(() => import('./containers/Jurisdictions'))
const Education = loadable(() => import('./containers/Education'))
const Pricing = loadable(() => import('./containers/Pricing'))
const Licenses = loadable(() => import('./containers/Licenses'))
const Users = loadable(() => import('./containers/Users'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/jurisdictions" />} />
      <Route path="home" element={<Home />} />
      <Route path="privacy" element={<Privacy />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<PortalLayout />}>
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
