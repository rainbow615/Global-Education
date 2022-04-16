import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Space, Typography, notification } from 'antd'

import { createComponent, updateComponent } from '../../../services/componentService'
import { useProtocol } from '../../../services/protocolService'
import { COMPONENTS_TYPES } from '../../../config/constants'
import { isChangedComponentForm } from '../../../utils'
import { getDuplicationMsg } from '../../../utils/names'
import ComponentForm from '../Form'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import AddLinkedProtocol from './AddLinkedProtocol'
import CustomLoading from '../../Loading/Loading'
import { ResultFailed } from '../../ResultPages'
import { ProtocolView } from './styles'

const { Text } = Typography

const ComponentLink = (props) => {
  const { orgId, orgName, isNew, data } = props
  const navigate = useNavigate()

  const [isFormChange, setIsFormChange] = useState(false)
  const [content, setContent] = useState(data?.component_content || '')
  const [linkedProtocol, setLinkedProtocol] = useState()
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState({
    create: false,
    edit: false,
  })

  const protocolId =
    data?.linked_protocol && data.linked_protocol.length > 0 ? data.linked_protocol[0] : null
  const { data: linkedProtocolData, error } = useProtocol(protocolId)

  useEffect(() => {
    if (linkedProtocolData?.data) {
      setLinkedProtocol(linkedProtocolData?.data)
    }
  }, [linkedProtocolData?.data])

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onChangeContent = (_event, editor) => {
    setErrorMsg('')

    const newValue = editor.getData()

    if (newValue === '') {
      setErrorMsg('Please input Content')
    }

    setContent(newValue)

    if (newValue !== data.component_content) {
      setIsFormChange(true)
    }
  }

  const onAddProtocol = (protocol) => {
    setLinkedProtocol(protocol)

    if (protocol?.protocol_id !== linkedProtocolData?.data?.protocol_id) {
      setIsFormChange(true)
    } else {
      setIsFormChange(false)
    }
  }

  const onRemoveProtocol = () => {
    setLinkedProtocol(null)

    if (linkedProtocolData?.data?.protocol_id) {
      setIsFormChange(true)
    } else {
      setIsFormChange(false)
    }
  }

  const onCreate = (values) => {
    setErrorMsg('')

    if (content === '') {
      setErrorMsg('Please input Content')
      return
    }

    if (content === data.component_content) {
      setErrorMsg(getDuplicationMsg(COMPONENTS_TYPES[4].id))
      return
    }

    const payload = {
      organization_id: orgId,
      parent_id: null,
      component_type: COMPONENTS_TYPES[4].id,
      tags: values.tags || [],
      component_content: content,
      is_ordered: false,
      component_order: 1,
      linked_protocol: linkedProtocol?.protocol_id ? [linkedProtocol.protocol_id] : [],
      linked_education: values.linked_education,
    }

    setIsLoading({ ...isLoading, create: true })

    createComponent(payload)
      .then((res) => {
        setIsLoading({ ...isLoading, create: false })
        setIsFormChange(false)
        notification.success({ message: 'A new Link component has been created successfully!' })

        if (res && res.data) {
          navigate(`/organizations/components/form/${COMPONENTS_TYPES[4].id}/edit`, {
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
    setErrorMsg('')

    if (content === '') {
      setErrorMsg('Please input Content')
      return
    }

    const id = values.component_id
    const payload = {
      organization_id: orgId,
      parent_id: values.parent_id,
      component_type: COMPONENTS_TYPES[4].id,
      tags: values.tags || [],
      component_content: content,
      is_ordered: values.is_ordered || false,
      component_order: values.component_order,
      linked_protocol: linkedProtocol?.protocol_id ? [linkedProtocol.protocol_id] : [],
      linked_education: values.linked_education,
      component_children: values.component_children || [],
    }

    setIsLoading({ ...isLoading, edit: true })

    updateComponent(id, payload)
      .then(() => {
        setIsLoading({ ...isLoading, edit: false })
        setIsFormChange(false)
        notification.success({ message: 'A new Link component has been updated successfully!' })
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
    const isCheck = isChangedComponentForm(isNew ? {} : data, values, { component_content: true })

    setIsFormChange(isCheck)
  }

  const onClose = () => {
    navigate(`/organizations/components/list`, {
      state: { orgId, orgName },
    })
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
          placeholder="Enter text"
          onChange={onChangeContent}
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Text>{`Linked Protocol `}</Text>
          <AddLinkedProtocol orgId={orgId} onSelect={onAddProtocol} />
        </Space>
        {linkedProtocol && (
          <ProtocolView size="large">
            <Space>
              <Text>{linkedProtocol.protocol_number}</Text>
              <Text>{linkedProtocol.protocol_name}</Text>
            </Space>
            <Button type="link" size="small" danger onClick={onRemoveProtocol}>
              Remove
            </Button>
          </ProtocolView>
        )}
        {linkedProtocolData.isLoading && (
          <ProtocolView size="large">
            <CustomLoading size="small" />
          </ProtocolView>
        )}
      </Form.Item>
    </ComponentForm>
  )
}

export default ComponentLink
