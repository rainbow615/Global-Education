import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

const GlobalEducationList = loadable(() => import('./List'))
const GlobalEducationForm = loadable(() => import('./Form'))
const GlobalEducationReview = loadable(() => import('./ChangeReview'))
const GlobalProtocolsProof = loadable(() => import('./ProtocolsProof'))

function GlobalEducation() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<GlobalEducationList />} />
      <Route path="form/:type" element={<GlobalEducationForm />} />
      <Route path="review" element={<GlobalEducationReview />} />
      <Route path="proof" element={<GlobalProtocolsProof />} />
    </Routes>
  )
}

export default GlobalEducation
