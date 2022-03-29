import React, { useState } from 'react'
import { Form, Input, Select, Space, Button, notification } from 'antd'

import { updateUser, useUser } from '../../../services/userService'
import States from '../../../config/states.json'
import { CustomModal } from '../../../components/CommonComponent'
import { CustomStatistic } from '../styles'

const { Option } = Select

const AddressInfo = (props) => {
  const { data } = props
  const { user_id, address1, address2, city, state, postal_code } = data
  const { mutate } = useUser(user_id)

  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      full_name: data.full_name,
      phone: data.phone,
      enabled: data.enabled,
      address1: values.address1,
      address2: values?.address2 || '',
      unit: data.unit,
      city: values.city,
      state: values.state,
      postal_code: values.zip,
    }

    updateUser(user_id, payload)
      .then(() => {
        setIsLoading(false)
        setModalVisible(false)
        mutate()

        notification.success({
          message: 'Successfully updated!',
        })
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Update failed!',
          description: error?.data || '',
        })
      })
  }

  const address = `${address1} ${city}, ${state} ${postal_code}\n${address2 || ''}`
  const initialValues = { address1, address2, city, state, zip: postal_code }

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
      <CustomModal
        title="Change your Address"
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <Form name="address-form" initialValues={initialValues} onFinish={onFinish}>
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
                    {state.name}
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
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </CustomModal>
    </React.Fragment>
  )
}

export default AddressInfo
