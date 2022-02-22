import React from 'react'

import TopInfo from './TopInfo'
import NameInfo from './NameInfo'
import EmailInfo from './EmailInfo'
import PhoneNumberInfo from './PhoneNumberInfo'
import AddressInfo from './AddressInfo'

const UserInfo = (props) => {
  const { data } = props

  return (
    <React.Fragment>
      <TopInfo data={data} />
      <NameInfo data={data} />
      <EmailInfo data={data} />
      <PhoneNumberInfo data={data} />
      <AddressInfo data={data} />
    </React.Fragment>
  )
}

export default UserInfo
