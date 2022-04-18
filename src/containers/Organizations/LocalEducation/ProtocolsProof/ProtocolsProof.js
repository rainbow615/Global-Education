import React from 'react'
import { useLocation } from 'react-router-dom'

import ProtocolsProof from '../../../../components/Education/ProtocolsProof'

const LocalProtocolsProof = (props) => {
  const { orgId, orgName } = props
  const location = useLocation()
  const data = location?.state
  const title = data?.jit_name || ''
  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: orgName,
      link: '/organizations/dashboard',
      state: {
        id: orgId,
        name: orgName,
      },
    },
    {
      title: 'Local Education',
      link: '/organizations/local-education/list',
      state: { orgId },
    },
    {
      title,
    },
    {
      title: `Proof`,
    },
  ]

  return <ProtocolsProof breadCrumb={breadCrumb} orgId={orgId} />
}

export default LocalProtocolsProof
