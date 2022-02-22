import React, { useState } from 'react'
import { Button, Form, Input, Space, Typography } from 'antd'

import { CustomModal } from '../../../../components/CommonComponent'
import { CustomStatistic } from '../styles'

const { Title } = Typography

const PhoneNumberInfo = (props) => {
  const { phone } = props.data

  const [modalVisible, setModalVisible] = useState(false)

  const onFinish = (values) => {}

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Phone</span>
            <Button size="small" onClick={() => setModalVisible(true)}>
              Edit
            </Button>
          </React.Fragment>
        }
        value={`+1 (XXX) XXX-${phone.substr(-4)}`}
      />
      <CustomModal
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <Form name="phone-form" initialValues={{}} onFinish={onFinish}>
          <Title level={3}>Change the user's phone</Title>
          <Form.Item
            name="phone"
            hasFeedback
            rules={[{ required: true, message: 'Phone number is required' }]}
          >
            <Input placeholder="Phone *" />
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

export default PhoneNumberInfo
