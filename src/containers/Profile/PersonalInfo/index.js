import React from 'react'
import { Tag } from 'antd'

import PhoneNumberInfo from './PhoneNumberInfo'
import AddressInfo from './AddressInfo'
import PasswordInfo from './PasswordInfo'
import { CustomStatistic } from '../styles'

const PersonalInfo = (props) => {
  const { data } = props
  const { email, full_name, phone, address1, address2, city, state, postal_code } = data

  return (
    <React.Fragment>
      <CustomStatistic title="Name" value={full_name} />
      <CustomStatistic title="Email" value={email} suffix={<Tag color="success">Verified</Tag>} />
      <PhoneNumberInfo phone={phone} />
      <AddressInfo
        address1={address1}
        address2={address2}
        city={city}
        state={state}
        postal_code={postal_code}
      />
      <PasswordInfo />
    </React.Fragment>
  )
}

export default PersonalInfo
