import React from 'react'
import { Tag } from 'antd'

import PhoneNumberInfo from './PhoneNumberInfo'
import AddressInfo from './AddressInfo'
import PasswordInfo from './PasswordInfo'
import { CustomStatistic } from '../styles'

const PersonalInfo = () => {
  return (
    <React.Fragment>
      <CustomStatistic title="Name" value="John Ehrhart" />
      <CustomStatistic
        title="Email"
        value="john@ehrhart.com"
        suffix={<Tag color="success">Verified</Tag>}
      />
      <PhoneNumberInfo />
      <AddressInfo />
      <PasswordInfo />
    </React.Fragment>
  )
}

export default PersonalInfo
