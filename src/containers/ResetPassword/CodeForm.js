import { Form, Input, Button, notification, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'

const codeRules = [
  {
    required: true,
    message: 'Please input your code!',
  }
]

const CodeForm = () => {
  const [, setSearchParams] = useSearchParams()

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

  return (
    <Form
      autoComplete="off"
      initialValues={{}}
      layout="vertical"
      name="code-confirm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      requiredMark={false}
    >
      <Typography.Title>Confirm code we sent to your +1 (XXX) XXX-XX-55 number</Typography.Title>
      <Form.Item
        label="Code"
        name="code"
        rules={codeRules}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CodeForm
