import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import { useLocation } from 'react-router-dom'

const OrgProtocolsList = loadable(() => import('./List'))

function OrgProtocols() {
  const { state } = useLocation()
  const orgId = state?.orgId || null

  if (!orgId) {
    return <Navigate to="/organizations/list" />
  }

  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<OrgProtocolsList orgId={orgId} />} />
    </Routes>
  )
}

export default OrgProtocols
