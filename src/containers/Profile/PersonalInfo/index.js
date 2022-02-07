import React from 'react'
import { Tag } from 'antd'

import PhoneNumberInfo from './PhoneNumberInfo'
import AddressInfo from './AddressInfo'
import PasswordInfo from './PasswordInfo'
import { CustomStatistic } from '../styles'

const PersonalInfo = (props) => {
  const { data } = props
  const { email, full_name, phone } = data

  return (
    <React.Fragment>
      <CustomStatistic title="Name" value={full_name} />
      <CustomStatistic title="Email" value={email} suffix={<Tag color="success">Verified</Tag>} />
      <PhoneNumberInfo phone={phone} />
      <AddressInfo data={data} />
      <PasswordInfo />
    </React.Fragment>
  )
}

export default PersonalInfo
