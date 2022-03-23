import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import EducationForm from '../../../components/Education/Form'

const GlobalEducationForm = () => {
  const { type } = useParams()
  const location = useLocation()
  const jitData = location?.state
  const breadCrumb = [
    {
      title: 'Global Education',
      link: '/global-education',
    },
    {
      title: type === 'new' ? 'Add' : `Draft: ${jitData?.jit_name}`,
    },
  ]

  return <EducationForm breadCrumb={breadCrumb} isGlobal />
}

export default GlobalEducationForm
