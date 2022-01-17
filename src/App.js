import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

import { AuthLayout } from './containers/AuthLayout'
import { PortalLayout } from './containers/PortalLayout'

// Page containers
const Login = loadable(() => import('./containers/Login'))
const Users = loadable(() => import('./containers/Users'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<PortalLayout />}>
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
