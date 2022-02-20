import React from 'react'

import TopInfo from './TopInfo'
import NameInfo from './NameInfo'
import EmailInfo from './EmailInfo'
import PhoneNumberInfo from './PhoneNumberInfo'
import AddressInfo from './AddressInfo'

const data = {
  address1: '555 Oak Blvd',
  address2: '201 Parkway',
  city: 'San Diego',
  state: 'CA',
  postal_code: '92102',
}

const UserInfo = (props) => {
  return (
    <React.Fragment>
      <TopInfo />
      <NameInfo />
      <EmailInfo />
      <PhoneNumberInfo phone="6502570295" />
      <AddressInfo data={data} />
    </React.Fragment>
  )
}

export default UserInfo
