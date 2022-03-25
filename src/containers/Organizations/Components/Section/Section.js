import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Select, Button, Space, notification } from 'antd'
import Switch from 'react-switch'

import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentForm from '../../../../components/Components/Form'

const { Option } = Select

const Tags = []

const ComponentSectionForm = (props) => {
  const { orgId, orgName } = props
  const { type } = useParams()

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: `${orgName}`,
    },
    {
      title: `Components`,
      link: '/organizations/components/list',
      state: { orgId, orgName },
    },
    {
      title: type === 'edit' ? 'Edit Section' : 'Add Section',
    },
  ]

  const [isOrdered, setIsOrdered] = useState(false)

  const onChangeOrder = (checked) => {
    setIsOrdered(checked)
  }

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
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
              Selecting this will number everything added to this section component based on 
              order.
            </i>
          </Space>
        </Form.Item>
      </ComponentForm>
    </React.Fragment>
  )
}

export default ComponentSectionForm
