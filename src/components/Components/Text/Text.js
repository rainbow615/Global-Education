import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Select, Row, Col, notification } from 'antd'

import { createComponent, updateComponent } from '../../../services/componentService'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../Form'
import { COMPONENT_FORM_ROLE, COMPONENTS_TYPES } from '../../../config/constants'
import { isChangedComponentForm } from '../../../utils'
import { getDuplicationMsg } from '../../../utils/names'

const { Option } = Select
const Tags = []

const ComponentText = (props) => {
  const { isNew, orgId, orgName, data, role, onSuccessSubmit } = props
  const navigate = useNavigate()

  const [isFormChange, setIsFormChange] = useState(false)
  const [content, setContent] = useState(data?.component_content || '')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState({
    create: false,
    edit: false,
  })

  const onChangeContent = (_event, editor) => {
    setErrorMsg('')

    const newValue = editor.getData()

    if (newValue === '') {
      setErrorMsg('Please input Content')
    }

    setContent(newValue)

    if (newValue !== data?.component_content) {
      setIsFormChange(true)
    }
  }

  const onCreate = (values) => {
    setErrorMsg('')

    if (content === '') {
      setErrorMsg('Please input Content')
      return
    }

    if (content === data?.component_content) {
      setErrorMsg(getDuplicationMsg(COMPONENTS_TYPES[1].id))
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
      .then((res) => {
        setIsLoading({ ...isLoading, create: false })
        setIsFormChange(false)
        notification.success({ message: 'A new Text component has been created successfully!' })

        if (role === COMPONENT_FORM_ROLE.ONLY_CREATE) {
          onSuccessSubmit()
        } else {
          if (res && res.data) {
            navigate(`/organizations/components/form/${COMPONENTS_TYPES[1].id}/edit`, {
              state: { ...res.data, orgId, orgName: orgName },
            })
          }
        }
      })
      .catch((error) => {
        setIsLoading({ ...isLoading, create: false })

        notification.error({
          message: 'Save failed!',
          description: error?.data || '',
        })

        if (error?.status === 409) {
          setErrorMsg(error?.data || '')
        }
      })
  }

  const onEdit = (values) => {
    setErrorMsg('')

    if (content === '') {
      setErrorMsg('Please input Content')
      return
    }

    const id = values.component_id
    const payload = {
      organization_id: orgId,
      parent_id: values.parent_id,
      component_type: COMPONENTS_TYPES[1].id,
      tags: values.tags || [],
      component_content: content,
      is_ordered: false,
      component_order: values.component_order,
      linked_protocol: [],
      linked_education: values.linked_education,
      component_children: values.component_children || [],
    }

    setIsLoading({ ...isLoading, edit: true })

    updateComponent(id, payload)
      .then(() => {
        setIsLoading({ ...isLoading, edit: false })
        setIsFormChange(false)
        notification.success({ message: 'A new Text component has been updated successfully!' })
      })
      .catch((error) => {
        setIsLoading({ ...isLoading, edit: false })

        notification.error({
          message: 'Modify failed!',
          description: error?.data || '',
        })

        if (error?.status === 409) {
          setErrorMsg(error?.data || '')
        }
      })
  }

  const onChangeValue = (values) => {
    const isCheck = isChangedComponentForm(isNew ? {} : data, values, { component_content: true })

    setIsFormChange(isCheck)
  }

  const onClose = () => {
    if (role === COMPONENT_FORM_ROLE.ONLY_CREATE) {
      onSuccessSubmit()
    } else {
      navigate(`/organizations/components/list`, {
        state: { orgId, orgName },
      })
    }
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
      onClose={onClose}
    >
      <Form.Item
        required
        label="Content"
        validateStatus={errorMsg ? 'error' : undefined}
        help={errorMsg}
      >
        <CustomCkEditor
          simpleMode
          data={content}
          placeholder="Enter text"
          onChange={onChangeContent}
        />
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

export default ComponentText
