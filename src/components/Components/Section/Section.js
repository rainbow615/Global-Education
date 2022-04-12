import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Select, Space, notification } from 'antd'
import Switch from 'react-switch'

import { createComponent, updateComponent } from '../../../services/componentService'
import ComponentForm from '../Form'
import { COMPONENTS_TYPES } from '../../../config/constants'
import { isChangedComponentForm } from '../../../utils'

const { Option } = Select
const Tags = []

const ComponentSection = (props) => {
  const { orgId, orgName, isNew, data } = props
  const navigate = useNavigate()

  const [isFormChange, setIsFormChange] = useState(false)
  const [isOrdered, setIsOrdered] = useState(!!data?.is_ordered)
  const [isLoading, setIsLoading] = useState({
    create: false,
    edit: false,
  })

  const onChangeOrder = (checked) => {
    setIsOrdered(checked)
  }

  const onCreate = (values) => {
    const payload = {
      organization_id: orgId,
      parent_id: null,
      component_type: COMPONENTS_TYPES[0].id,
      tags: values.tags || [],
      component_content: values.component_content,
      is_ordered: values.is_ordered || false,
      component_order: 1,
      linked_protocol: [],
      linked_education: values.linked_education,
    }

    setIsLoading({ ...isLoading, create: true })

    createComponent(payload)
      .then((res) => {
        setIsLoading({ ...isLoading, create: false })
        setIsFormChange(false)
        notification.success({ message: 'A new section component has been created successfully!' })

        if (res && res.data) {
          navigate(`/organizations/components/form/${COMPONENTS_TYPES[0].id}/edit`, {
            state: { ...res.data, orgId, orgName: data.orgName },
          })
        }
      })
      .catch((error) => {
        setIsLoading({ ...isLoading, create: false })

        notification.error({
          message: 'Save failed!',
          description: error?.data || '',
        })
      })
  }

  const onEdit = (values) => {
    const id = values.component_id
    const payload = {
      organization_id: orgId,
      parent_id: values.parent_id,
      component_type: COMPONENTS_TYPES[0].id,
      tags: values.tags || [],
      component_content: values.component_content,
      is_ordered: values.is_ordered || false,
      component_order: values.component_order,
      linked_protocol: values.linked_protocol,
      linked_education: values.linked_education,
      component_children: values.component_children || [],
    }

    setIsLoading({ ...isLoading, edit: true })

    updateComponent(id, payload)
      .then(() => {
        setIsLoading({ ...isLoading, edit: false })
        setIsFormChange(false)
        notification.success({ message: 'A new section component has been updated successfully!' })
      })
      .catch((error) => {
        setIsLoading({ ...isLoading, edit: false })

        notification.error({
          message: 'Modify failed!',
          description: error?.data || '',
        })
      })
  }

  const onChangeValue = (values) => {
    const isCheck = isChangedComponentForm(isNew ? {} : data, values)

    setIsFormChange(isCheck)
  }

  return (
    <ComponentForm
      initialValues={data}
      isNew={isNew}
      isLoading={isLoading}
      orgId={orgId}
      orgName={orgName}
      isChanged={isFormChange}
      onCreate={onCreate}
      onEdit={onEdit}
      onChangeValue={onChangeValue}
    >
      <Form.Item
        label="Content"
        name="component_content"
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
        <Form.Item label="Ordered?" name="is_ordered">
          <Switch onChange={onChangeOrder} checked={isOrdered} />
        </Form.Item>
        <i>Selecting this will number everything added to this section component based on order.</i>
      </Space>
    </ComponentForm>
  )
}

export default ComponentSection
