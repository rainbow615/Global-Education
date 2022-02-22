import React from 'react'

import { CustomStatistic } from '../styles'

import TopInfo from './TopInfo'

const UserInfo = (props) => {
  const { data } = props
  const { full_name, email, phone, address1, address2, city, state, postal_code } = data
  const address = `${address1 || ''} ${city || ''}${state ? ',' : ''} ${state || ''} ${
    postal_code || ''
  }\n${address2 || ''}`

  return (
    <React.Fragment>
      <TopInfo data={data} />
      <CustomStatistic title="Name" value={full_name} />
      <CustomStatistic title="Email" value={email} />
      <CustomStatistic title="Phone" value={`+1 (XXX) XXX-${phone.substr(-4)}`} />
      <CustomStatistic title="Address" value={address} />
    </React.Fragment>
  )
}

export default UserInfo
