import { Modal, Form, Input } from 'antd'
import { createUser } from '../../services/userService'

const rules = [
  {
    required: true,
    message: 'Required!',
  },
]

const CreateUserModal = ({ visible, onClose }) => {
  const [form] = Form.useForm()

  const handleSave = () => {
    form
      .validateFields()
      .then(createUser)
      .then(onClose)
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <Modal title="Create User" visible={visible} onOk={handleSave} onCancel={onClose}>
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        <Form.Item label="First Name" name="firstName" rules={rules}>
          <Input placeholder="John" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" rules={rules}>
          <Input placeholder="Smith" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={rules}>
          <Input placeholder="1" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={rules}>
          <Input type="email" placeholder="..." />
        </Form.Item>
        <Form.Item label="Address" name="address1" rules={rules}>
          <Input placeholder="" />
        </Form.Item>
        <Form.Item name="address2">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="State" name="state">
          <Input placeholder="NY" />
        </Form.Item>
        <Form.Item label="Postal Code" name="postal_code">
          <Input placeholder="" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserModal
