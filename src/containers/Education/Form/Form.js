import React, { useState } from 'react'
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom'
import { Form, Input, Button, Space, notification } from 'antd'

import { createEducation, updateEducation } from '../../../services/jitService'
import CustomCkEditor from '../../../components/CustomCkEditor/CustomCkEditor'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import { Root } from './styles'

const EducationForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      content: editorContent,
      status: 'UNPUBLISHED',
    }

    setIsLoading(true)

    if (type === 'new') {
      createEducation(payload)
        .then((res) => {
          setIsLoading(false)
          notification.success({ message: 'A new JIT Education has been created successfully!' })

          navigate('/education/review', { state: payload })
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Add Failure',
            description: error?.data || '',
          })
        })
    } else {
      const id = location?.state?.id

      updateEducation(id, payload)
        .then(() => {
          setIsLoading(false)
          notification.success({ message: 'A JIT Education has been updated successfully!' })
          navigate('/education/review', { state: payload })
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Upate Failure',
            description: error?.data || '',
          })
        })
    }
  }

  const onFinishFailed = () => {}

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          autoComplete="off"
          initialValues={location.state || {}}
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
              data={location?.state?.content}
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
              <Button size="large" htmlType="submit" loading={isLoading}>
                Send to Review
              </Button>
              <Button size="large">
                <Link to="/education/list">Close</Link>
              </Button>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default EducationForm
