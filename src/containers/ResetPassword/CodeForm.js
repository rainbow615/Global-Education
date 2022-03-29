import React, { useState, useEffect } from 'react'
import { Form, Button, notification, Typography, Space, Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'
import ReactCodeInput from 'react-verification-code-input'
import { Link } from 'react-router-dom'

import { whoAmI, send2FACode, check2FACode } from '../../services/authService'
import { setUser, removeUser } from '../../utils/cookie'
import { LinkButton } from '../../components/CommonComponent'
import CustomLoading from '../../components/Loading/Loading'
import { ResultFailed } from '../../components/ResultPages'

const codeRules = [
  {
    required: true,
    message: 'Please input your code!',
  },
]

const CodeForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isReSendingCode, setIsReSendingCode] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState()

  useEffect(() => {
    const onSendVerificationCode = () => {
      removeUser()

      whoAmI(token)
        .then((res) => {
          const phone = res?.data?.phone
          const userId = res?.data?.user_id

          if (phone && userId) {
            setUser(res?.data, true)

            send2FACode()
              .then(() => {
                setPhoneNumber(phone.substr(-4))
                setIsLoading(false)
              })
              .catch((error) => {
                setIsLoading(false)
                removeUser()
              })
          }
        })
        .catch((error) => {
          setIsLoading(false)
        })
    }

    if (token) onSendVerificationCode()
  }, [token])

  const onShowNotification = () => {
    notification.error({
      message: 'Verification failed!',
      description: 'Sorry, the request failed. Please try again later.',
    })
  }

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
    setIsSendingCode(true)

    check2FACode(code)
      .then((result) => {
        setIsSendingCode(false)

        if (result?.data?.valid) {
          removeUser()
          setSearchParams({ token: token, step: 'new-password' })
        } else {
          onShowNotification()
        }
      })
      .catch((error) => {
        setIsSendingCode(false)

        if (error?.data !== 'Unauthorized') {
          onShowNotification()
        }
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  if (isLoading) {
    return <CustomLoading />
  }

  if (!phoneNumber) {
    return <ResultFailed />
  }

  return (
    <Space direction="vertical" align="center">
      <Typography.Title align="center" level={2}>
        Confirm code we sent to your +1 (XXX) XXX-XX-{phoneNumber}
      </Typography.Title>
      <Space direction="vertical">
        <Form
          autoComplete="off"
          initialValues={{}}
          layout="vertical"
          name="code-confirm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
        >
          <Form.Item name="code" rules={codeRules}>
            <ReactCodeInput fieldWidth={50} fieldHeight={50} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={isSendingCode}>
              {isSendingCode ? 'Sending...' : 'Next'}
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
            <Link to="/home">Back to home</Link>
          </LinkButton>
        </Space>
      </Space>
    </Space>
  )
}

export default CodeForm
