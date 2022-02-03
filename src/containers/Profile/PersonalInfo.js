import React from 'react'
import { Tag, Button } from 'antd'

import { CustomStatistic } from './styles'

const PersonalInfo = () => {
  return (
    <React.Fragment>
      <CustomStatistic title="Name" value="Narayanan Bhattarcharya" />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Email</span>
            <Button size="small">Edit</Button>
          </React.Fragment>
        }
        value="john@ehrhart.com"
        suffix={<Tag color="success">Verified</Tag>}
      />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Phone</span>
            <Button size="small">Edit</Button>
          </React.Fragment>
        }
        value="+1 (XXX) XXX-XX55"
        suffix={<Tag color="success">Verified</Tag>}
      />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Address</span>
            <Button size="small">Edit</Button>
          </React.Fragment>
        }
        value="555 Oak Blvd, Apt 5 San Diego, CA 92101"
      />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Password</span>
            <Button size="small">Edit</Button>
          </React.Fragment>
        }
        value={'*'.repeat(10)}
      />
    </React.Fragment>
  )
}

export default PersonalInfo
