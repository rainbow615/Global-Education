import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import loadable from '@loadable/component'
import { useLocation } from 'react-router-dom'

const OrgComponentsList = loadable(() => import('./List'))

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
    </Routes>
  )
}

export default OrgComponents
