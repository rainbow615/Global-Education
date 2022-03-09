import React from 'react'
import { useLocation } from 'react-router-dom'

import ChangeReview from '../../../../components/Education/ChangeReview'

const LocalEducationReview = (props) => {
  const { orgId } = props
  const location = useLocation()
  const data = location?.state
  const title = data?.name || ''
  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: 'Local Education',
      link: '/organizations/local-education/list',
      state: { orgId },
    },
    {
      title: `In-Review: ${title}`,
    },
  ]

  return <ChangeReview breadCrumb={breadCrumb} orgId={orgId} />
}

export default LocalEducationReview
