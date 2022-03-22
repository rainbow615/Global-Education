import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import { useLocation } from 'react-router-dom'

const OrgProtocolsList = loadable(() => import('./List'))
const OrgProtocolsForm = loadable(() => import('./Form'))
const OrgProtocolsChangeReview = loadable(() => import('./ChangeReview'))
const OrgProtocolsProof = loadable(() => import('./Proof'))

function OrgProtocols() {
  const { state } = useLocation()
  const orgId = state?.orgId || null
  const orgName = state?.orgName || ''

  if (!orgId) {
    return <Navigate to="/organizations/list" />
  }

  return (
    <Routes>
      <Route path="" element={<Navigate to="list" />} />
      <Route path="list" element={<OrgProtocolsList orgId={orgId} orgName={orgName} />} />
      <Route path="form/:type" element={<OrgProtocolsForm orgId={orgId} orgName={orgName} />} />
      <Route path="review" element={<OrgProtocolsChangeReview orgId={orgId} orgName={orgName} />} />
      <Route path="proof" element={<OrgProtocolsProof orgId={orgId} orgName={orgName} />} />
    </Routes>
  )
}

export default OrgProtocols
