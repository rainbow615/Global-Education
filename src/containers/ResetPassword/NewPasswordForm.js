import { Form, Input, Button, notification, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

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

  const onFinish = (values) => {
    // TODO: login and navigate to dashboard
    console.log(values)
    notification.success({ message: 'Password has been reset successfully. Redirecting to login' })
    setTimeout(() => {
      navigate('/login')
    }, 5000)
  }

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Failed to reset password',
      description: errorInfo,
    })
    console.log('Failed:', errorInfo)
  }

  return (
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
      <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={confirmPasswordRules}
      >
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

export default NewPasswordForm
