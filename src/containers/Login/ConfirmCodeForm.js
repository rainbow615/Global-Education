import { Form, Input, Button, Typography, notification } from 'antd'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { getUser, removeUser, setConfirmLogin } from '../../utils/cookie'
import { check2FACode } from '../../services/authService'

const { Text } = Typography

const codeRules = [
  {
    required: true,
    message: 'Please input your password!',
  },
]

const ConfirmCodeForm = () => {
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const user = getUser()
  const phoneNumber = user?.phone

  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    const code = values?.code

    if (code) {
      setIsLoading(true)

      check2FACode(code)
        .then((result) => {
          setIsLoading(false)

          if (result?.data?.valid) {
            setConfirmLogin()
            navigate('/dashboard')
          } else {
            notification.error({
              message: 'Verification Failure',
              description: 'Wrong code. Please try again.',
            })
          }
        })
        .catch((error) => {
          setIsLoading(false)

          if (error?.data !== 'Unauthorized') {
            removeUser()

            notification.error({
              message: 'Verification Failure',
              description: 'Sorry, the request failed. Please try again later.',
            })

            setSearchParams({})
          }
        })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      autoComplete="off"
      initialValues={{}}
      layout="vertical"
      name="confirm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      requiredMark={false}
    >
      <Text>Confirm code we sent to your +1 (XXX) XXX-XX-{phoneNumber.substr(-2)} number</Text>

      <Form.Item name="code" rules={codeRules}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {isLoading ? 'Checking' : 'Enter dashboard'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ConfirmCodeForm
