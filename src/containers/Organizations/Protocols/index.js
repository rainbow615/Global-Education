import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import { useLocation } from 'react-router-dom'

const OrgProtocolsList = loadable(() => import('./List'))
const OrgProtocolsForm = loadable(() => import('./Form'))
const OrgProtocolsChangeReview = loadable(() => import('./ChangeReview'))

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
      <Route path="form/:type" element={<OrgProtocolsForm orgId={orgId} />} />
      <Route path="review" element={<OrgProtocolsChangeReview orgId={orgId} />} />
    </Routes>
  )
}

export default OrgProtocols
