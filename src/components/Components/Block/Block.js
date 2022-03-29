import React, { useState } from 'react'
import { Form, Space, Select, Typography, Tag } from 'antd'
import Switch from 'react-switch'
import { HolderOutlined } from '@ant-design/icons'

import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../Form'
import AddSubComponents from './AddSubComponents'
import { SubComponentList, SubComponentRow } from './styles'

const { Option } = Select
const { Text } = Typography
const Tags = []

const ComponentBlock = (props) => {
  const { orgId } = props

  const [isOrdered, setIsOrdered] = useState(false)

  const onChangeOrder = (checked) => {
    setIsOrdered(checked)
  }

  return (
    <ComponentForm initialValues={{}}>
      <Form.Item label="Content" name="content">
        <CustomCkEditor simpleMode data={''} placeholder="Enter block text" />
      </Form.Item>
      <Form.Item label="Ordered?" name="name">
        <Space>
          <Switch onChange={onChangeOrder} checked={isOrdered} />
          <i>
            Selecting this will number to everything contained in this Block based on their order.
          </i>
        </Space>
      </Form.Item>
      <Form.Item>
        <Space>
          <Text>{`Block Subcomponents `}</Text>
          <AddSubComponents orgId={orgId} />
        </Space>
        <SubComponentList>
          <SubComponentRow>
            <Space>
              <Tag>T</Tag>
              <Text>If 12-Lead EKG shows STEMI, notify BH and transport to STEMI center</Text>
            </Space>
            <HolderOutlined style={{ fontSize: 22, cursor: 'pointer' }} />
          </SubComponentRow>
          <SubComponentRow>
            <Space>
              <Tag>T</Tag>
              <Text>If 12-Lead EKG shows STEMI, notify BH and transport to STEMI center</Text>
            </Space>
            <HolderOutlined style={{ fontSize: 22, cursor: 'pointer' }} />
          </SubComponentRow>
        </SubComponentList>
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tags"
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
    </ComponentForm>
  )
}

export default ComponentBlock
