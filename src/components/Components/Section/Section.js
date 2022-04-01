import React, { useState } from 'react'
import { Form, Input, Select, Space, notification } from 'antd'
import Switch from 'react-switch'

import { createComponent } from '../../../services/componentService'
import ComponentForm from '../Form'
import { COMPONENTS_TYPES } from '../../../config/constants'

const { Option } = Select
const Tags = []

const ComponentSection = (props) => {
  const { orgId, isNew } = props

  const [isOrdered, setIsOrdered] = useState(false)
  const [isLoading, setIsLoading] = useState({
    delete: false,
    create: false,
    edit: false,
  })

  const onCreate = (values) => {
    const payload = {
      organization_id: orgId,
      parent_id: null,
      component_type: COMPONENTS_TYPES[0].id,
      tags: values.tags || [],
      component_content: values.content,
      is_ordered: values['is-ordered'] || false,
      component_order: 1,
      linked_protocol: [],
      linked_education: values.linked_education,
    }

    setIsLoading({ ...isLoading, create: true })

    createComponent(payload)
      .then(() => {
        setIsLoading({ ...isLoading, create: false })
        notification.success({ message: 'A new section component has been created successfully!' })
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Save failed!',
          description: error?.data || '',
        })
      })
  }

  const onEdit = () => {}

  return (
    <ComponentForm
      isNew={isNew}
      isLoading={isLoading}
      orgId={orgId}
      onCreate={onCreate}
      onEdit={onEdit}
    >
      <Form.Item
        label="Content"
        name="content"
        hasFeedback
        rules={[{ required: true, message: 'Please input a section name' }]}
      >
        <Input placeholder="Enter a section name" size="large" />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select
          mode="multiple"
          size="large"
          allowClear
          showSearch
          showArrow
          optionLabelProp="label"
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
        >
          {Tags.map((tag, index) => (
            <Option key={index} value={tag.id} label={tag.name}>
              {tag.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Space>
        <Form.Item label="Ordered?" name="is-ordered">
          <Switch onChange={(checked) => setIsOrdered(checked)} checked={isOrdered} />
        </Form.Item>
        <i>Selecting this will number everything added to this section component based on order.</i>
      </Space>
    </ComponentForm>
  )
}

export default ComponentSection
