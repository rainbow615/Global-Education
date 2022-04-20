import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Space, Select, Typography, notification } from 'antd'
import Switch from 'react-switch'
import _ from 'lodash'

import { createComponent, updateComponent } from '../../../services/componentService'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../Form'
import ComponentsMenu from '../ComponentsMenu'
import SubComponentList from './SubComponentsList'
import {
  COMPONENT_FORM_ROLE,
  COMPONENTS_TYPES,
  NEW_COMPONENTS_MENU,
} from '../../../config/constants'
import { isChangedComponentForm } from '../../../utils'
import { getDuplicationMsg } from '../../../utils/names'

const { Option } = Select
const { Text } = Typography
const Tags = []
const subComponentsMenu = NEW_COMPONENTS_MENU.filter(
  (obj) => obj.id !== COMPONENTS_TYPES[2].id && obj.id !== COMPONENTS_TYPES[0].id
)

const ComponentBlock = (props) => {
  const { orgId, orgName, isNew, data, role, onSuccessSubmit } = props
  const componentChildren = (data?.component_children || []).map((obj) => ({
    component_id: obj.child_component_id,
    component_order: obj.child_component_order,
    component_content: obj.child_component_content,
    component_type: obj.child_component_type,
  }))

  const navigate = useNavigate()

  const [isFormChange, setIsFormChange] = useState(false)
  const [content, setContent] = useState(data?.component_content || '')
  const [isOrdered, setIsOrdered] = useState(!!data?.is_ordered)
  const [selectedComponents, setSelectedComponents] = useState(componentChildren)
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

  const compareComponents = (origin, other) => {
    const originIds = origin ? origin.map((obj) => obj.component_id) : []
    const otherIds = other ? other.map((obj) => obj.component_id) : []

    if (_.isEqual(originIds, otherIds)) return true

    return false
  }

  const onAddComponent = (component) => {
    const newList = [...selectedComponents, component]
    setSelectedComponents(newList)

    if (compareComponents(newList, componentChildren)) {
      setIsFormChange(false)
    } else {
      setIsFormChange(true)
    }
  }

  const onChangeComponents = (list) => {
    setSelectedComponents(list)

    if (compareComponents(list, componentChildren)) {
      setIsFormChange(false)
    } else {
      setIsFormChange(true)
    }
  }

  const onChangeOrder = (checked) => {
    setIsOrdered(checked)
  }

  const onCreate = (values) => {
    setErrorMsg('')

    if (content === '') {
      setErrorMsg('Please input Content')
      return
    }

    if (content === data?.component_content) {
      setErrorMsg(getDuplicationMsg(COMPONENTS_TYPES[2].id))
      return
    }

    const component_children = selectedComponents.map((obj, index) => ({
      child_component_id: obj.component_id,
      child_component_order: index + 1,
    }))

    const payload = {
      organization_id: orgId,
      parent_id: null,
      component_type: COMPONENTS_TYPES[2].id,
      tags: values.tags || [],
      component_content: content,
      is_ordered: values.is_ordered || false,
      component_order: 1,
      linked_protocol: [],
      linked_education: values.linked_education,
      component_children,
    }

    setIsLoading({ ...isLoading, create: true })

    createComponent(payload)
      .then((res) => {
        setIsLoading({ ...isLoading, create: false })
        setIsFormChange(false)

        notification.success({
          message: 'A new block component has been created successfully!',
        })

        if (role === COMPONENT_FORM_ROLE.ONLY_CREATE) {
          onSuccessSubmit()
        } else {
          if (res && res.data) {
            navigate(`/organizations/components/form/${COMPONENTS_TYPES[2].id}/edit`, {
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
    const component_children = selectedComponents.map((obj, index) => ({
      child_component_id: obj.component_id,
      child_component_order: index + 1,
    }))
    const payload = {
      organization_id: orgId,
      parent_id: values.parent_id,
      component_type: COMPONENTS_TYPES[2].id,
      tags: values.tags || [],
      component_content: content,
      is_ordered: values.is_ordered || false,
      component_order: values.component_order,
      linked_protocol: values.linked_protocol,
      linked_education: values.linked_education,
      component_children,
    }

    setIsLoading({ ...isLoading, edit: true })

    updateComponent(id, payload)
      .then(() => {
        setIsLoading({ ...isLoading, edit: false })
        setIsFormChange(false)
        notification.success({ message: 'A new block component has been updated successfully!' })
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
      <Form.Item label="Content" validateStatus={errorMsg ? 'error' : undefined} help={errorMsg}>
        <CustomCkEditor
          simpleMode
          data={content}
          placeholder="Enter block text"
          onChange={onChangeContent}
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
          <ComponentsMenu
            orgId={orgId}
            list={subComponentsMenu}
            onSelect={onAddComponent}
            disabledComponents={selectedComponents}
          />
        </Space>
        <SubComponentList
          list={selectedComponents}
          key={selectedComponents.length}
          onChange={onChangeComponents}
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

export default ComponentBlock
