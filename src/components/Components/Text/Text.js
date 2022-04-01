import React, { useState } from 'react'
import { Form, Select, Row, Col, notification } from 'antd'

import { createComponent } from '../../../services/componentService'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../Form'
import { COMPONENTS_TYPES } from '../../../config/constants'

const { Option } = Select
const Tags = []

const ComponentText = (props) => {
  const { isNew, orgId } = props

  const [content, setContent] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState({
    delete: false,
    create: false,
    edit: false,
  })

  const onCreate = (values) => {
    setErrorMsg('')

    if (content === '') {
      setErrorMsg('Please input Content')
      return
    }

    const payload = {
      organization_id: orgId,
      parent_id: null,
      component_type: COMPONENTS_TYPES[1].id,
      tags: values.tags || [],
      component_content: content,
      is_ordered: false,
      component_order: 1,
      linked_protocol: [],
      linked_education: values.linked_education,
    }

    setIsLoading({ ...isLoading, create: true })

    createComponent(payload)
      .then(() => {
        setIsLoading({ ...isLoading, create: false })
        notification.success({ message: 'A new Text component has been created successfully!' })
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
        validateStatus={errorMsg ? 'error' : undefined}
        help={errorMsg}
      >
        <CustomCkEditor
          simpleMode
          data={''}
          placeholder="Enter text"
          onChange={(_event, editor) => {
            setContent(editor.getData())
          }}
        />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
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
        </Col>
      </Row>
    </ComponentForm>
  )
}

export default ComponentText
