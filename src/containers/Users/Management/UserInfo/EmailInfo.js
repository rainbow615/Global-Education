import React, { useState } from 'react'
import { Button, Form, Input, Space, Typography } from 'antd'

import { CustomModal } from '../../../../components/CommonComponent'
import { CustomStatistic } from '../styles'

const { Title } = Typography

const emailRules = [
  {
    required: true,
    message: 'Email is required',
  },
  {
    type: 'email',
    message: 'Please input valid email',
  },
]

const EmailInfo = (props) => {
  const { email } = props.data

  const [modalVisible, setModalVisible] = useState(false)

  const onFinish = (values) => {}

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Email</span>
            <Button size="small" onClick={() => setModalVisible(true)}>
              Edit
            </Button>
          </React.Fragment>
        }
        value={email}
      />
      <CustomModal
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <Form name="email-form" initialValues={{}} onFinish={onFinish}>
          <Title level={3}>Change the user's email</Title>
          <Form.Item name="email" hasFeedback rules={emailRules}>
            <Input placeholder="Email *" />
          </Form.Item>
          <Form.Item className="bottom-actions">
            <Space>
              <Button htmlType="button" onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={false}>
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </CustomModal>
    </React.Fragment>
  )
}

export default EmailInfo
