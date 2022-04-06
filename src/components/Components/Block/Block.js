import React, { useState } from 'react'
import { Form, Space, Select, Typography } from 'antd'
import Switch from 'react-switch'

import { createComponent, updateComponent } from '../../../services/componentService'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../Form'
import AddSubComponents from './AddSubComponents'
import SubComponentList from './SubComponentsList'

const { Option } = Select
const { Text } = Typography
const Tags = []

const ComponentBlock = (props) => {
  const { orgId, isNew, data } = props

  const [content, setContent] = useState(data?.component_content || '')
  const [isOrdered, setIsOrdered] = useState(!!data?.is_ordered)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState({
    create: false,
    edit: false,
  })

  const onChangeOrder = (checked) => {
    setIsOrdered(checked)
  }

  const onCreate = () => {}

  const onEdit = () => {}

  return (
    <ComponentForm
      initialValues={data}
      isNew={isNew}
      isLoading={isLoading}
      orgId={orgId}
      onCreate={onCreate}
      onEdit={onEdit}
    >
      <Form.Item label="Content" validateStatus={errorMsg ? 'error' : undefined} help={errorMsg}>
        <CustomCkEditor
          simpleMode
          data={content}
          placeholder="Enter block text"
          onChange={(_event, editor) => {
            setContent(editor.getData())
          }}
        />
      </Form.Item>
      <Space>
        <Form.Item label="Ordered?" name="is_ordered">
          <Switch onChange={onChangeOrder} checked={isOrdered} />
        </Form.Item>
        <i>
          Selecting this will number to everything contained in this Block based on their order.
        </i>
      </Space>
      <Form.Item>
        <Space>
          <Text>{`Block Subcomponents `}</Text>
          <AddSubComponents orgId={orgId} />
        </Space>
        <SubComponentList />
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
    </ComponentForm>
  )
}

export default ComponentBlock
