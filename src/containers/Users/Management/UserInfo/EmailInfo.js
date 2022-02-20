import React from 'react'
import { Button } from 'antd'

import { CustomStatistic } from '../styles'

const EmailInfo = () => {
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
        value="Allwithyou999@gmail.com"
      />
    </React.Fragment>
  )
}

export default EmailInfo
