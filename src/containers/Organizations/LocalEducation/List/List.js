import React from 'react'
import { useLocation } from 'react-router-dom'

import EducationList from '../../../../components/Education/List'

const LocalEducationList = () => {
  const { state } = useLocation()
  const id = state?.id || null

  return <EducationList orgId={id} />
}

export default LocalEducationList
