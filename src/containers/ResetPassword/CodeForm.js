import { Form, Button, notification, Typography, Space } from 'antd'
import { useSearchParams } from 'react-router-dom'
import ReactCodeInput from 'react-verification-code-input'
import { Link } from 'react-router-dom'

import { LinkButton } from '../../components/CommonComponent'

const codeRules = [
  {
    required: true,
    message: 'Please input your code!',
  },
]

const CodeForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const onFinish = (values) => {
    // TODO: verify code and continue to reset
    console.log(values)
    setSearchParams({ step: 'new-password' })
  }

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Login Failure',
      description: errorInfo,
    })
    console.log('Failed:', errorInfo)
  }

  console.log('=====token=', token)

  return (
    <Space direction="vertical" align="center">
      <Typography.Title align="center" level={2}>
        Confirm code we sent to your +1 (XXX) XXX-XX-55 number
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
            <Button type="primary" htmlType="submit" block size="large">
              Next
            </Button>
          </Form.Item>
        </Form>
        <Space direction="vertical">
          <LinkButton>
            <Link to="/login">Re-send code</Link>
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
