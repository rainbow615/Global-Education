import React from 'react'
import { useLocation } from 'react-router-dom'

import ChangeReview from '../../../components/Education/ChangeReview'

const GlobalEducationReview = () => {
  const location = useLocation()
  const data = location?.state
  const title = data?.jit_name || ''
  const breadCrumb = [
    {
      title: 'Global Education',
      link: '/global-education',
    },
    {
      title: `In-Review: ${title}`,
    },
  ]

  return <ChangeReview isGlobal breadCrumb={breadCrumb} />
}

export default GlobalEducationReview
