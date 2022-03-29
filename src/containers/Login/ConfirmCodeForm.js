import React, { useState } from 'react'
import { Form, Button, notification, Space } from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ReactCodeInput from 'react-verification-code-input'

import { getUser, removeUser, setConfirmLogin } from '../../utils/cookie'
import { send2FACode, check2FACode } from '../../services/authService'
import { LinkButton } from '../../components/CommonComponent'
import { ConfirmLabel } from './styles'

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
  const phoneNumber = user?.phone || ''

  const [isLoading, setIsLoading] = useState(false)
  const [isReSendingCode, setIsReSendingCode] = useState(false)

  const onResendCode = () => {
    setIsReSendingCode(true)
    
    send2FACode().then(() => {
      setIsReSendingCode(false)
      notification.success({
        message: 'Resent the new code successfully.',
      })
    })
  }

  const onFinish = (values) => {
    const code = values?.code

    if (code) {
      setIsLoading(true)

      check2FACode(code)
        .then((result) => {
          setIsLoading(false)

          if (result?.data?.valid) {
            setConfirmLogin()
            navigate('/organizations')
          } else {
            notification.error({
              message: 'Verification failed!',
              description: 'Wrong code. Please try again.',
            })
          }
        })
        .catch((error) => {
          setIsLoading(false)

          if (error?.data !== 'Unauthorized') {
            removeUser()

            notification.error({
              message: 'Verification failed!',
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
    <Space direction="vertical">
      <Form
        autoComplete="off"
        initialValues={{}}
        layout="vertical"
        name="confirm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <ConfirmLabel>
          Confirm code we sent to your to +1 (XXX) XXX-{phoneNumber.substr(-4)}
        </ConfirmLabel>

        <Form.Item name="code" hasFeedback rules={codeRules}>
          <ReactCodeInput fieldWidth={50} fieldHeight={50} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} size="large">
            {isLoading ? 'Checking' : 'Enter dashboard'}
          </Button>
        </Form.Item>
      </Form>
      <Space direction="vertical">
        <LinkButton>
          <Button type="link" onClick={onResendCode} loading={isReSendingCode}>
            Re-send code
          </Button>
        </LinkButton>
        <LinkButton>
          <Link to="/home">Back to Home</Link>
        </LinkButton>
      </Space>
    </Space>
  )
}

export default ConfirmCodeForm
