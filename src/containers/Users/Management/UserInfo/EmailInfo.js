import React from 'react'
import { Button } from 'antd'

import { CustomStatistic } from '../styles'

const EmailInfo = (props) => {
  const { email } = props.data

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Email</span>
            <Button size="small" onClick={() => {}}>
              Edit
            </Button>
          </React.Fragment>
        }
        value={email}
      />
    </React.Fragment>
  )
}

export default EmailInfo
