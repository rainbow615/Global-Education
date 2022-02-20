import React from 'react'
import { Button } from 'antd'

import { CustomStatistic } from '../styles'

const PhoneNumberInfo = (props) => {
  const { phone } = props

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Phone</span>
            <Button size="small" onClick={() => {}}>
              Edit
            </Button>
          </React.Fragment>
        }
        value={`+1 (XXX) XXX-${phone.substr(-4)}`}
      />
    </React.Fragment>
  )
}

export default PhoneNumberInfo
