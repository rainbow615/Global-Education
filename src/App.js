import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

import { AuthLayout } from './containers/AuthLayout'
import { PortalLayout } from './containers/PortalLayout'

// Page containers
const ForgotPassword = loadable(() => import('./containers/ForgotPassword'))
const Home = loadable(() => import('./containers/Home'))
const Login = loadable(() => import('./containers/Login'))
const ResetPassword = loadable(() => import('./containers/ResetPassword'))
const Dashboard = loadable(() => import('./containers/Dashboard'))
const Users = loadable(() => import('./containers/Users'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="home" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<PortalLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
