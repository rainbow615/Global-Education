import React, { useState } from 'react'
import { Button, Form, Space, Typography } from 'antd'

import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../Form'
import AddLinkedProtocol from './AddLinkedProtocol'
import { ProtocolView } from './styles'

const { Text } = Typography

const ComponentLink = (props) => {
  const { orgId, isNew } = props

  const [linkedProtocol, setLinkedProtocol] = useState(null)
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

  const onCreate = () => {}

  const onEdit = () => {}

  return (
    <ComponentForm
      isNew={isNew}
      isLoading={isLoading}
      orgId={orgId}
      onCreate={onCreate}
      onEdit={onEdit}
    >
      <Form.Item label="Content" name="content">
        <CustomCkEditor simpleMode data={''} placeholder="Enter text" />
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
