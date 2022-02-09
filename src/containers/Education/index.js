import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'

const EducationList = loadable(() => import('./List'))
const EducationForm = loadable(() => import('./Form'))

function Education() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<EducationList />} />
      <Route path="form/:type" element={<EducationForm />} />
    </Routes>
  )
}

export default Education
