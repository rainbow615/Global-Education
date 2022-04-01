import React, { useState } from 'react'
import { Button, Form, Space, Typography, notification } from 'antd'

import { createComponent } from '../../../services/componentService'
import { COMPONENTS_TYPES } from '../../../config/constants'
import ComponentForm from '../Form'
import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import AddLinkedProtocol from './AddLinkedProtocol'
import { ProtocolView } from './styles'

const { Text } = Typography

const ComponentLink = (props) => {
  const { orgId, isNew } = props

  const [content, setContent] = useState('')
  const [linkedProtocol, setLinkedProtocol] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState({
    delete: false,
    create: false,
    edit: false,
  })

  const onAddProtocol = (protocol) => {
    setLinkedProtocol(protocol)
  }

  const onRemoveProtocol = () => {
    setLinkedProtocol(null)
  }

  const onCreate = (values) => {
    setErrorMsg('')

    if (content === '') {
      setErrorMsg('Please input Content')
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
      .then(() => {
        setIsLoading({ ...isLoading, create: false })
        notification.success({ message: 'A new Link component has been created successfully!' })
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
      <Form.Item label="Content" validateStatus={errorMsg ? 'error' : undefined} help={errorMsg}>
        <CustomCkEditor
          simpleMode
          data={''}
          placeholder="Enter text"
          onChange={(_event, editor) => {
            setContent(editor.getData())
          }}
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
      </Form.Item>
    </ComponentForm>
  )
}

export default ComponentLink
