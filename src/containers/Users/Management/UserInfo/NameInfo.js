import React from 'react'
import { Button } from 'antd'

import { CustomStatistic } from '../styles'

const NameInfo = () => {
  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Name</span>
            <Button size="small" onClick={() => {}}>
              Edit
            </Button>
          </React.Fragment>
        }
        value="Chentao Wang"
      />
    </React.Fragment>
  )
}

export default NameInfo
