import React from 'react'
import { useLocation } from 'react-router-dom'

import ProtocolsProof from '../../../components/Education/ProtocolsProof'

const GlobalProtocolsProof = () => {
  const location = useLocation()
  const data = location?.state
  const title = data?.jit_name || ''
  const breadCrumb = [
    {
      title: 'Global Education',
      link: '/global-education',
    },
    {
      title: `Proof: ${title}`,
    },
  ]

  return <ProtocolsProof isGlobal breadCrumb={breadCrumb} />
}

export default GlobalProtocolsProof
