import { Form, Input, Button, Typography, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

const codeRules = [
  {
    required: true,
    message: 'Please input your password!',
  },
]

const ConfirmCodeForm = () => {
  const navigate = useNavigate()

  const onFinish = (values) => {
    // TODO: login and navigate to dashboard
    console.log(values)
    navigate('/dashboard')
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
      name="confirm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      requiredMark={false}
    >
      <Text>Confirm code we sent to your +1 (XXX) XXX-XX-55 number</Text>

      <Form.Item name="code" rules={codeRules}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enter dashboard
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ConfirmCodeForm
