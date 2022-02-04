import React, { useState } from 'react'
import { Form, Input, Button, notification, Typography, Space } from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { changePassword } from '../../services/authService'
import { LinkButton } from '../../components/CommonComponent'

const passwordRules = [
  {
    required: true,
    message: 'Please input your password!',
  },
]
const confirmPasswordRules = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'))
    },
  }),
]

const NewPasswordForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    const { password } = values
    setIsLoading(true)

    changePassword({ new_password: password }, token)
      .then(() => {
        setIsLoading(false)

        notification.success({
          message: 'Password has been reset successfully. Redirecting to login',
        })

        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Space direction="vertical" align="center">
      <Form
        autoComplete="off"
        initialValues={{}}
        layout="vertical"
        name="request-email"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Typography.Title>Enter new password</Typography.Title>
        <Form.Item name="password" hasFeedback rules={passwordRules}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={confirmPasswordRules}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Space direction="vertical">
        <LinkButton>
          <Link to="/home">Back to home</Link>
        </LinkButton>
      </Space>
    </Space>
  )
}

export default NewPasswordForm
