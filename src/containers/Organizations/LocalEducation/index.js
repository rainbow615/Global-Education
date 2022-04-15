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
  const orgName = state?.orgName || null

  if (!orgId) {
    return <Navigate to="/organizations/list" />
  }

  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<LocalEducationList orgId={orgId} orgName={orgName} />} />
      <Route path="form/:type" element={<LocalEducationForm orgId={orgId} orgName={orgName} />} />
      <Route path="review" element={<LocalEducationReview orgId={orgId} orgName={orgName} />} />
      <Route path="proof" element={<LocalProtocolsProof orgId={orgId} orgName={orgName} />} />
    </Routes>
  )
}

export default LocalEducation
