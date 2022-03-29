import React from 'react'
import { useLocation } from 'react-router-dom'

import ProtocolsProof from '../../../../components/Education/ProtocolsProof'

const LocalProtocolsProof = (props) => {
  const { orgId } = props
  const location = useLocation()
  const data = location?.state
  const title = data?.jit_name || ''
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
      title: `Proof: ${title}`,
    },
  ]

  return <ProtocolsProof breadCrumb={breadCrumb} orgId={orgId} />
}

export default LocalProtocolsProof
