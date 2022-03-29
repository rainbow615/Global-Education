import React, { useState } from 'react'
import { Form, Input, Select, Space } from 'antd'
import Switch from 'react-switch'

import ComponentForm from '../../Components/Form'

const { Option } = Select
const Tags = []

const ComponentSection = () => {
  const [isOrdered, setIsOrdered] = useState(false)

  const onChangeOrder = (checked) => {
    setIsOrdered(checked)
  }

  return (
    <ComponentForm>
      <Form.Item
        label="Content"
        name="name"
        hasFeedback
        rules={[{ required: true, message: 'Please input a section name' }]}
      >
        <Input placeholder="Enter a section name" size="large" />
      </Form.Item>

      <Form.Item
        label="Tags"
        name="tags"
        className="tags"
        hasFeedback
        rules={[{ required: true, message: 'Please select 1 or more tag.' }]}
      >
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
      <Form.Item label="Ordered?" name="name">
        <Space>
          <Switch onChange={onChangeOrder} checked={isOrdered} />
          <i>
            Selecting this will number everything added to this section component based on order.
          </i>
        </Space>
      </Form.Item>
    </ComponentForm>
  )
}

export default ComponentSection
