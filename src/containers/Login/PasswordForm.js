import React, { useState } from 'react'
import { Form, Input, Button, notification, Space } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'

import { login, send2FACode } from '../../services/authService'
import { setUser, removeUser } from '../../utils/cookie'
import { LinkButton } from '../../components/CommonComponent'
import { LoginFormContainer } from './styles'

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
const passwordRules = [
  {
    required: true,
    message: 'Please input your password!',
  },
]

const PasswordForm = () => {
  const [, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)

    login(values)
      .then((res) => {
        setUser(res?.data, true)

        send2FACode()
          .then(() => {
            setIsLoading(false)
            notification.success({ message: 'A confirmation code has been sent to your phone!' })
            setSearchParams({ step: 'confirm-code' })
          })
          .catch((error) => {
            setIsLoading(false)

            if (error?.data !== 'Unauthorized') {
              removeUser()

              notification.error({
                message: 'Verification Failure',
                description: 'Sorry, the request failed. Please try again.',
              })
            }
          })
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Login Failure',
          description: error?.data || '',
        })
      })

    return false
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <LoginFormContainer>
      <Form
        autoComplete="off"
        initialValues={{}}
        layout="vertical"
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Form.Item label="Email" name="email" hasFeedback rules={emailRules}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" hasFeedback rules={passwordRules}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} size="large">
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
      <Space direction="vertical">
        <LinkButton>
          <Link to="/home#request-access">Request Access</Link>
        </LinkButton>
        <LinkButton>
          <Link to="/forgot-password">Forgot Password?</Link>
        </LinkButton>
        <LinkButton>
          <Link to="/home">Back to Home</Link>
        </LinkButton>
      </Space>
    </LoginFormContainer>
  )
}

export default PasswordForm
