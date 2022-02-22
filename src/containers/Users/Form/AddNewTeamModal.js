import React, { useState } from 'react'
import { Button, Form, Input, Typography, Space } from 'antd'

import { AddNewTeamModalView } from './styles'

const { Title } = Typography

const AddNewTeamModal = (props) => {
  const { visible, onClose } = props

  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    console.log(values)
    onClose()
  }

  return (
    <React.Fragment>
      <AddNewTeamModalView visible={visible} footer={null} onCancel={() => onClose()}>
        <Form name="new-team-form" initialValues={{}} onFinish={onFinish}>
          <Title level={3}>Add new organization</Title>
          <Form.Item
            name="teamName"
            hasFeedback
            rules={[{ required: true, message: 'Team name is required' }]}
          >
            <Input placeholder="Team name" />
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
      </AddNewTeamModalView>
    </React.Fragment>
  )
}

export default AddNewTeamModal
