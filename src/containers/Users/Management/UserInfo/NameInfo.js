import React, { useState } from 'react'
import { Button, Form, Input, Space, Typography } from 'antd'

import { CustomModal } from '../../../../components/CommonComponent'
import { CustomStatistic } from '../styles'

const { Title } = Typography

const NameInfo = (props) => {
  const { full_name } = props.data

  const [modalVisible, setModalVisible] = useState(false)

  const onFinish = (values) => {}

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Name</span>
            <Button size="small" onClick={() => setModalVisible(true)}>
              Edit
            </Button>
          </React.Fragment>
        }
        value={full_name}
      />
      <CustomModal
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <Form name="name-form" initialValues={{}} onFinish={onFinish}>
          <Title level={3}>Change the user's name</Title>
          <Form.Item
            name="fistname"
            hasFeedback
            rules={[{ required: true, message: 'First Name is required' }]}
          >
            <Input placeholder="First Name *" />
          </Form.Item>
          <Form.Item
            name="lastname"
            hasFeedback
            rules={[{ required: true, message: 'Last Name is required' }]}
          >
            <Input placeholder="Last Name *" />
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

export default NameInfo
