import { Form, Input, Button, notification } from 'antd'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { login } from '../../services/authService'
import { setUser } from '../../utils/cookie'

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

        setIsLoading(false)
        notification.success({ message: 'Confirmation code has been sent to your email' })
        setSearchParams({ step: 'confirm-code' })
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
    <Form
      autoComplete="off"
      initialValues={{}}
      layout="vertical"
      name="login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      requiredMark={false}
    >
      <Form.Item label="Email" name="email" rules={emailRules}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={passwordRules}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PasswordForm
