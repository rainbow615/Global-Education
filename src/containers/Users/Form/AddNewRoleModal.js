import React, { useState } from 'react'
import { Button, Form, Input, Select, Typography, Space } from 'antd'

import { AddNewRoleModalView, ConfirmTextTitle } from './styles'

const { Option } = Select
const { Text } = Typography

const ROLES = [
  {
    title: 'Superuser',
  },
  {
    title: 'Administrator',
  },
]

const ORGANIZATIONS = [
  {
    title: 'Global',
  },
  {
    title: 'San Diego County',
  },
  {
    title: 'Alameda County',
  },
]

const AddNewRoleModal = (props) => {
  const { visible, onClose } = props

  const [isLoading] = useState(false)

  const onFinish = (values) => {
    console.log(values)
    onClose()
  }

  return (
    <React.Fragment>
      <AddNewRoleModalView layout="vertical" visible={visible} footer={null} onCancel={() => onClose()}>
        <Form name="new-role-form" initialValues={{}} onFinish={onFinish}>
          <Form.Item>
            <Form.Item
              label="Role"
              name="role"
              hasFeedback
              rules={[{ required: true, message: 'Please input Role' }]}
              className="role"
            >
              <Select placeholder="Role">
                {ROLES.map((role, index) => (
                  <Option value={role.title} key={index}>
                    {role.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Organizations"
              name="organizations"
              hasFeedback
              rules={[{ required: true, message: 'Please choose organization' }]}
              className="organization"
            >
              <Select placeholder="Organizations">
                {ORGANIZATIONS.map((org, index) => (
                  <Option value={org.title} key={index}>
                    {org.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <ConfirmTextTitle>
            <Text>Confirmation</Text>
            <Text>Type "CONFIRM" to confirm your action.</Text>
          </ConfirmTextTitle>
          <Form.Item
            name="confirmation"
            rules={[{ required: true, message: 'Confirmation is required' }]}
          >
            <Input placeholder="Confirmation" />
          </Form.Item>
          <Form.Item className="bottom-actions">
            <Space>
              <Button htmlType="button" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Finish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </AddNewRoleModalView>
    </React.Fragment>
  )
}

export default AddNewRoleModal
