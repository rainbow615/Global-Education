import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import EducationForm from '../../../../components/Education/Form'

const LocalEducationForm = (props) => {
  const { orgId } = props
  const { type } = useParams()
  const location = useLocation()
  const jitData = location?.state
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
      title: type === 'new' ? 'Add' : `Draft: ${jitData?.jit_name}`,
    },
  ]

  return <EducationForm breadCrumb={breadCrumb} orgId={orgId} />
}

export default LocalEducationForm
