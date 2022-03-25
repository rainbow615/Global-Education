import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Form, Space, Typography } from 'antd'

import CustomCkEditor from '../../../../components/CustomCkEditor/CustomCkEditor'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentForm from '../../../../components/Components/Form'
import AddLinkedProtocol from './AddLinkedProtocol'
import { ProtocolView } from './styles'

const { Text } = Typography

const ComponentLinkForm = (props) => {
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
      title: type === 'edit' ? 'Edit Link' : 'Add Link',
    },
  ]

  const [linkedProtocol, setLinkedProtocol] = useState(null)

  const onRemoveProtocol = () => {
    setLinkedProtocol(null)
  }

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <ComponentForm initialValues={{}}>
        <Form.Item label="Content" name="content">
          <CustomCkEditor simpleMode data={''} placeholder="Enter text" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Text>{`Linked Protocol `}</Text>
            <AddLinkedProtocol />
          </Space>
          <ProtocolView size="large">
            <Space>
              <Text>S-134</Text>
              <Text>Allergic Reactions</Text>
            </Space>
            <Button type="link" size="small" danger onClick={onRemoveProtocol}>
              Remove
            </Button>
          </ProtocolView>
        </Form.Item>
      </ComponentForm>
    </React.Fragment>
  )
}

export default ComponentLinkForm
