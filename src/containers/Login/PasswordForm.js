import { Form, Input, Button, notification } from 'antd'
import { useSearchParams } from 'react-router-dom'

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

  const onFinish = (values) => {
    // TODO: login and navigate to dashboard
    console.log(values)
    notification.success({ message: 'Confirmation code has been sent to your email' })
    setSearchParams({ step: 'confirm-code' })
  }

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Login Failure',
      description: errorInfo,
    })
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PasswordForm
