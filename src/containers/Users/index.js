import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

const UsersList = loadable(() => import('./List'))
const UsersForm = loadable(() => import('./Form'))
const ManagementForm = loadable(() => import('./Management'))

function Users() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<UsersList />} />
      <Route path="form/:type" element={<UsersForm />} />
      <Route path="manage" element={<ManagementForm />} />
    </Routes>
  )
}

export default Users
