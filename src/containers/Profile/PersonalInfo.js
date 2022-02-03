import React, { useState } from 'react'
import { Form, Input, Select, Space, Tag, Button, Modal } from 'antd'

import States from '../../config/states.json'
import { CustomStatistic } from './styles'

const { Option } = Select

const PersonalInfo = () => {
  const [addressModalVisible, setAddressModalVisible] = useState(false)

  const onAddressFinish = (values) => {
    console.log(values)
  }

  return (
    <React.Fragment>
      <CustomStatistic title="Name" value="Narayanan Bhattarcharya" />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Email</span>
            <Button size="small">Edit</Button>
          </React.Fragment>
        }
        value="john@ehrhart.com"
        suffix={<Tag color="success">Verified</Tag>}
      />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Phone</span>
            <Button size="small">Edit</Button>
          </React.Fragment>
        }
        value="+1 (XXX) XXX-XX55"
        suffix={<Tag color="success">Verified</Tag>}
      />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Address</span>
            <Button size="small" onClick={() => setAddressModalVisible(true)}>
              Edit
            </Button>
          </React.Fragment>
        }
        value="555 Oak Blvd, Apt 5 San Diego, CA 92101"
      />
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Password</span>
            <Button size="small">Edit</Button>
          </React.Fragment>
        }
        value={'*'.repeat(10)}
      />
      <Modal
        title="Change your Address"
        centered
        visible={addressModalVisible}
        footer={null}
        className="custom-modal"
      >
        <Form name="complex-form" onFinish={onAddressFinish}>
          <Form.Item
            name="address1"
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
              rules={[{ required: true, message: 'City is required' }]}
              style={{ display: 'inline-block', width: 'calc(35% - 8px)' }}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="state"
              rules={[{ required: true, message: 'State is required' }]}
              style={{ display: 'inline-block', width: 'calc(40% - 8px)', marginLeft: '8px' }}
            >
              <Select placeholder="State">
                {States.map((state, index) => (
                  <Option value={state.abbreviation} key={index}>
                    {state.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="zip"
              rules={[{ required: true, message: 'zip is required' }]}
              style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 8px' }}
            >
              <Input placeholder="Zip" />
            </Form.Item>
          </Form.Item>
          <Form.Item className="bottom-actions">
            <Space>
              <Button htmlType="button" onClick={() => setAddressModalVisible(false)}>
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

export default PersonalInfo
