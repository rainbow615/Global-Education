import React from 'react'
import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { LinkButton } from './styles'

const Success = () => (
  <React.Fragment>
    <Typography.Title level={2} align="center">
      If the email matches an account in our database you will receive a reset link on your mailbox
    </Typography.Title>
    <Space />
    <LinkButton align="center">
      <Link to="/home">Back to homepage</Link>
    </LinkButton>
  </React.Fragment>
)

export default Success
