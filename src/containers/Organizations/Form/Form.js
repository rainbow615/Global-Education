import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Form, Input, Select, Button, Space, notification } from 'antd'

import { createOrganization, updateOrganization } from '../../../services/organizations'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import { TYPES } from '../../../config/constants'
import States from '../../../config/states.json'
import { Root } from './styles'

const { Option } = Select

const OrganizationsForm = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const { type } = useParams()
  const breadCrumb = [
    {
      title: 'Organizations',
    },
    {
      title: type === 'new' ? 'Add' : 'Edit',
    },
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [initial, setInitial] = useState()

  const onFinish = (values) => {
    const payload = {
      organization_name: values.name,
      organization_description: values.description,
      state: values.state,
      type: values.type,
      region: values.region,
    }

    setIsLoading(true)

    if (type === 'new') {
      createOrganization(payload)
        .then(() => {
          setIsLoading(false)
          form.resetFields()
          notification.success({ message: 'A new organization has been created successfully!' })
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Add Failure',
            description: error?.data || '',
          })
        })
    } else {
      const id = location.state.id

      updateOrganization(id, payload)
        .then(() => {
          setIsLoading(false)
          setInitial(values)
          notification.success({ message: 'A organization has been updated successfully!' })
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Add Failure',
            description: error?.data || '',
          })
        })
    }
  }

  const onFinishFailed = () => {}

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          form={form}
          autoComplete="off"
          initialValues={initial || location.state}
          layout="vertical"
          name="organizations"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            hasFeedback
            rules={[{ required: true, message: 'Please input Name' }]}
          >
            <Input placeholder="Name *" size="large" />
          </Form.Item>
          <Form.Item name="description" hasFeedback>
            <Input.TextArea
              showCount
              maxLength={1000}
              rows="5"
              size="large"
              placeholder="Description..."
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              label="Type"
              name="type"
              className="type"
              hasFeedback
              rules={[{ required: true, message: 'Please select Type' }]}
            >
              <Select
                placeholder="Type"
                size="large"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {TYPES.map((type) => (
                  <Option key={type.id} value={type.name}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Region"
              name="region"
              className="region"
              hasFeedback
              rules={[{ required: true, message: 'Please input Region' }]}
            >
              <Input placeholder="Region *" size="large" />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              className="state"
              rules={[{ required: true, message: 'Please select State' }]}
            >
              <Select placeholder="State" size="large" allowClear>
                {States.map((state, index) => (
                  <Option key={index} value={state.abbreviation}>
                    {state.abbreviation}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>

          <FormActionButtons>
            {type !== 'new' ? (
              <Button type="link" size="large" danger>
                Delete
              </Button>
            ) : (
              <div />
            )}
            <Space>
              <Button size="large" htmlType="submit" loading={isLoading}>
                {type === 'new' ? 'Add' : 'Update'}
              </Button>
              <Button size="large" disabled={type === 'new'}>
                Publish
              </Button>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default OrganizationsForm
