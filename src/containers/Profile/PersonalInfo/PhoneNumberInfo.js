import React, { useState } from 'react'
import { Tag, Button, Modal, Form, Space } from 'antd'

import { CustomStatistic } from '../styles'

const PhoneNumberInfo = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const onFinish = (values) => {
    console.log(values)
  }

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
        value="+1 (XXX) XXX-XX55"
        suffix={<Tag color="success">Verified</Tag>}
      />
      <Modal
        title="Change your Phone Number"
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        className="custom-modal"
      >
        <Form name="complex-form" onFinish={onFinish}>
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

export default PhoneNumberInfo
