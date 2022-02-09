import React from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Space } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import { Root } from './styles'

const EducationForm = () => {
  const { type } = useParams()
  const breadCrumb = [
    {
      title: 'JIT Education',
    },
    {
      title: type === 'new' ? 'Add' : 'Edit',
    },
  ]

  const onFinish = () => {}

  const onFinishFailed = () => {}

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          autoComplete="off"
          initialValues={{}}
          layout="vertical"
          name="education"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            hasFeedback
            rules={[{ required: true, message: 'Please input Name' }]}
          >
            <Input placeholder="Name *" size="large" />
          </Form.Item>
          <Form.Item>
            <Editor wrapperClassName="desc-wrapper" editorClassName="desc-editor" />
          </Form.Item>
          <FormActionButtons>
            <Button type="link" size="large" danger>
              Revert all changes
            </Button>
            <Space>
              <Button size="large" htmlType="submit">
                Send to Review
              </Button>
              <Button size="large">Close</Button>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default EducationForm
