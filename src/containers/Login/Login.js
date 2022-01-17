import { Form, Input, Checkbox, Button, Typography, notification } from 'antd'

const { Title } = Typography

const Login = () => {
  const onFinish = (values) => {
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
      name="login"
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title>Login</Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
