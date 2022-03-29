import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import { useLocation } from 'react-router-dom'

const OrgComponentsList = loadable(() => import('./List'))
const ComponentSectionForm = loadable(() => import('./Section'))
const ComponentBlockForm = loadable(() => import('./Block'))
const ComponentLinkForm = loadable(() => import('./Link'))
const ComponentTextForm = loadable(() => import('./Text'))
const ComponentMedicationForm = loadable(() => import('./Medication'))

function OrgComponents() {
  const { state } = useLocation()
  const orgId = state?.orgId || null
  const orgName = state?.orgName || ''

  if (!orgId) {
    return <Navigate to="/organizations/list" />
  }

  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<OrgComponentsList orgId={orgId} orgName={orgName} />} />
      <Route
        path="form/sections/:type"
        element={<ComponentSectionForm orgId={orgId} orgName={orgName} />}
      />
      <Route
        path="form/blocks/:type"
        element={<ComponentBlockForm orgId={orgId} orgName={orgName} />}
      />
      <Route
        path="form/links/:type"
        element={<ComponentLinkForm orgId={orgId} orgName={orgName} />}
      />
      <Route
        path="form/texts/:type"
        element={<ComponentTextForm orgId={orgId} orgName={orgName} />}
      />
      <Route
        path="form/medications/:type"
        element={<ComponentMedicationForm orgId={orgId} orgName={orgName} />}
      />
    </Routes>
  )
}

export default OrgComponents
