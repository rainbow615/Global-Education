import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

const LocalEducationList = loadable(() => import('./List'))
const LocalEducationForm = loadable(() => import('./Form'))
const LocalEducationReview = loadable(() => import('./ChangeReview'))
const LocalProtocolsProof = loadable(() => import('./ProtocolsProof'))

function LocalEducation() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<LocalEducationList />} />
      <Route path="form/:type" element={<LocalEducationForm />} />
      <Route path="review" element={<LocalEducationReview />} />
      <Route path="proof" element={<LocalProtocolsProof />} />
    </Routes>
  )
}

export default LocalEducation
