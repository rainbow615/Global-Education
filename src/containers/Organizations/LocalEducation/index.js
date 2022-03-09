import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import { useLocation } from 'react-router-dom'

const LocalEducationList = loadable(() => import('./List'))
const LocalEducationForm = loadable(() => import('./Form'))
const LocalEducationReview = loadable(() => import('./ChangeReview'))
const LocalProtocolsProof = loadable(() => import('./ProtocolsProof'))

function LocalEducation() {
  const { state } = useLocation()
  const orgId = state?.orgId || null

  if (!orgId) {
    return <Navigate to="/organizations/list" />
  }

  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<LocalEducationList orgId={orgId} />} />
      <Route path="form/:type" element={<LocalEducationForm orgId={orgId} />} />
      <Route path="review" element={<LocalEducationReview orgId={orgId} />} />
      <Route path="proof" element={<LocalProtocolsProof orgId={orgId} />} />
    </Routes>
  )
}

export default LocalEducation
