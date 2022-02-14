import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, Space } from 'antd'
import JoditEditor from 'jodit-pro-react'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import { Root } from './styles'

const config = {
  license: '%LICENSE_KEY%',
  readonly: false,
  uploader: {
    url: 'https://xdsoft.net/jodit/finder/?action=fileUpload',
  },
  filebrowser: {
    ajax: {
      url: 'https://xdsoft.net/jodit/finder/',
    },
    height: 580,
  },
}

const EducationForm = () => {
  const editor = useRef(null)
  const { type } = useParams()
  const [content, setContent] = useState('')
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
            {/* <Editor wrapperClassName="desc-wrapper" editorClassName="desc-editor" /> */}
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
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
