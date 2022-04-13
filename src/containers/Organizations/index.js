import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import Dashboard from './Dashboard'

const OrganizationsList = loadable(() => import('./List'))
const OrganizationsForm = loadable(() => import('./Form'))
const LocalEducation = loadable(() => import('./LocalEducation'))
const OrgProtocols = loadable(() => import('./Protocols'))
const OrgComponents = loadable(() => import('./Components'))

function Organizations() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<OrganizationsList />} />
      <Route path="form/:type" element={<OrganizationsForm />} />
      <Route path="local-education/*" element={<LocalEducation />} />
      <Route path="protocols/*" element={<OrgProtocols />} />
      <Route path="components/*" element={<OrgComponents />} />
      <Route path=":organization" element={<Dashboard />} />
    </Routes>
  )
}

export default Organizations
