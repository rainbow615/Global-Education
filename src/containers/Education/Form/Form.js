import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Space } from 'antd'

import CustomCkEditor from '../../../components/CustomCkEditor/CustomCkEditor'
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
  const [editorContent, setEditorContent] = useState()

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      content: editorContent,
    }

    console.log(JSON.stringify(payload))
  }

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
          <Form.Item className="wyswyg-editor">
            <CustomCkEditor
              onChange={(_event, editor) => {
                setEditorContent(editor.getData())
              }}
            />
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
