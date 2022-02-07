import React from 'react'
import { Tag } from 'antd'

import { CustomStatistic } from '../styles'

const PhoneNumberInfo = (props) => {
  const { phone } = props

  return (
    <React.Fragment>
      <CustomStatistic
        title="Phone"
        value={`+1 (XXX) XXX-${phone.substr(-4)}`}
        suffix={<Tag color="success">Verified</Tag>}
      />
    </React.Fragment>
  )
}

export default PhoneNumberInfo
