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
const OrganizationsList = loadable(() => import('./containers/Organizations/List'))
const OrganizationsForm = loadable(() => import('./containers/Organizations/Form'))
const EducationList = loadable(() => import('./containers/Education/List'))
const EducationForm = loadable(() => import('./containers/Education/Form'))
const Pricing = loadable(() => import('./containers/Pricing'))
const Licenses = loadable(() => import('./containers/Licenses'))
const Users = loadable(() => import('./containers/Users'))

function App() {
  const isAuthenticated = !!getConfirmLogin()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/organizations' : '/home'} />} />
      <Route path="home" element={<Home />} />
      <Route path="privacy" element={<Privacy />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="passwordreset" element={<ResetPassword />} />
      </Route>
      <Route element={<PortalLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route exact path="organizations" element={<Navigate to="/organizations/list" />} />
        <Route exact path="organizations/list" element={<OrganizationsList />} />
        <Route exact path="organizations/form" element={<OrganizationsForm />} />
        <Route exact path="education" element={<Navigate to="/education/list" />} />
        <Route exact path="education/list" element={<EducationList />} />
        <Route exact path="education/form" element={<EducationForm />} />
        <Route path="users" element={<Users />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="licenses" element={<Licenses />} />
      </Route>
    </Routes>
  )
}

export default App
