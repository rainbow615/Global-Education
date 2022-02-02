import React, { useState } from 'react'
import { Form, Input, Button, notification, Typography } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'

import { requestResetPassword } from '../../services/authService'
import { LinkButton } from './styles'

const emailRules = [
  {
    required: true,
    message: 'Please input your email!',
  },
  {
    type: 'email',
    message: 'Please input valid email',
  },
]

const EmailForm = () => {
  const [, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    // notification.success({ message: 'Confirmation code has been sent to your email' })

    setIsLoading(true)
    const email = values.email

    requestResetPassword(encodeURI(email))
      .then((res) => {
        setIsLoading(false)
        setSearchParams({ step: 'success' })
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Login Failure',
      description: errorInfo,
    })
    console.log('Failed:', errorInfo)
  }

  return (
    <React.Fragment>
      <Form
        autoComplete="off"
        initialValues={{}}
        layout="vertical"
        name="request-email"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Typography.Title>Reset Password</Typography.Title>
        <Form.Item label="Email" name="email" rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
      <LinkButton>
        <Link to="/login">Back to login</Link>
      </LinkButton>
      <LinkButton>
        <Link to="/home">Back to home</Link>
      </LinkButton>
    </React.Fragment>
  )
}

export default EmailForm
