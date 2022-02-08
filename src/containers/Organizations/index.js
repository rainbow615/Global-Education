import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

const OrganizationsList = loadable(() => import('./List'))
const OrganizationsForm = loadable(() => import('./Form'))

function Organizations() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<OrganizationsList />} />
      <Route path="form" element={<OrganizationsForm />} />
    </Routes>
  )
}

export default Organizations
