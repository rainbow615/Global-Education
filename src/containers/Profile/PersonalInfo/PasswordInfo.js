import React, { useState } from 'react'
import { Button, Modal, Form, Input, Space } from 'antd'

import { CustomStatistic } from '../styles'

const PasswordInfo = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Password</span>
            <Button size="small" onClick={() => setModalVisible(true)}>
              Change
            </Button>
          </React.Fragment>
        }
        value={'*'.repeat(10)}
      />
      <Modal
        title="Change your Password"
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        className="custom-modal"
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="password"
            hasFeedback
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  )
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item className="bottom-actions">
            <Space>
              <Button htmlType="button" onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default PasswordInfo
