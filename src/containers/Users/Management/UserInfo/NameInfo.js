import React from 'react'
import { Button } from 'antd'

import { CustomStatistic } from '../styles'

const NameInfo = (props) => {
  const { full_name } = props.data

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
        value={full_name}
      />
    </React.Fragment>
  )
}

export default NameInfo
