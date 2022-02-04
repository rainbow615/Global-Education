import React from 'react'
import { Tag } from 'antd'

import { CustomStatistic } from '../styles'

const PhoneNumberInfo = () => {
  return (
    <React.Fragment>
      <CustomStatistic
        title="Phone"
        value="+1 (XXX) XXX-XX55"
        suffix={<Tag color="success">Verified</Tag>}
      />
    </React.Fragment>
  )
}

export default PhoneNumberInfo
