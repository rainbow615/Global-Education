import React, { useState } from 'react'
import { Form, Input, Select, Space, Button, Modal } from 'antd'

import States from '../../../config/states.json'
import { CustomStatistic } from '../styles'

const { Option } = Select

const AddressInfo = (props) => {
  const { address1, address2, city, state, postal_code } = props
  const [modalVisible, setModalVisible] = useState(false)

  const onFinish = (values) => {
    console.log(values)
  }

  const address = `${address1} ${city}, ${state} ${postal_code} \n ${address2 || ''}`

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Address</span>
            <Button size="small" onClick={() => setModalVisible(true)}>
              Update
            </Button>
          </React.Fragment>
        }
        value={address}
      />
      <Modal
        title="Change your Address"
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        className="custom-modal"
      >
        <Form name="complex-form" onFinish={onFinish}>
          <Form.Item
            name="address1"
            hasFeedback
            rules={[{ required: true, message: 'Address line 1 is required' }]}
          >
            <Input placeholder="Address line 1" />
          </Form.Item>
          <Form.Item name="address2">
            <Input placeholder="Address line 2" />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="city"
              hasFeedback
              rules={[{ required: true, message: 'City is required' }]}
              style={{ display: 'inline-block', width: 'calc(35% - 8px)' }}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="state"
              hasFeedback
              rules={[{ required: true, message: 'State is required' }]}
              style={{ display: 'inline-block', width: 'calc(40% - 8px)', marginLeft: '8px' }}
            >
              <Select placeholder="State">
                {States.map((state, index) => (
                  <Option value={state.abbreviation} key={index}>
                    {state.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="zip"
              hasFeedback
              rules={[{ required: true, message: 'zip is required' }]}
              style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 8px' }}
            >
              <Input placeholder="Zip" />
            </Form.Item>
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

export default AddressInfo
