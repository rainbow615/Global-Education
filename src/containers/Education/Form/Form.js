import React, { useState, useCallback } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Space, Modal, notification } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { createEducation, updateEducation } from '../../../services/jitService'
import { compareObjects } from '../../../utils'
import { PUBLISHED_STATE } from '../../../config/constants'
import CustomCkEditor from '../../../components/CustomCkEditor/CustomCkEditor'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import { Root } from './styles'

const { confirm } = Modal

const EducationForm = () => {
  const location = useLocation()
  const jitData = location?.state
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { type } = useParams()
  const breadCrumb = [
    {
      title: 'JIT Education',
      link: '/education',
    },
    {
      title: type === 'new' ? 'Add' : 'Edit',
    },
  ]

  const [editorContent, setEditorContent] = useState(jitData?.content || '')
  const [isLoadStatus, setIsLoadStatus] = useState('')

  const isChanged = useCallback(() => {
    const name = form.getFieldValue('name')
    const formValues = {
      name,
      content: editorContent,
    }
    const originValues = {
      name: jitData?.name,
      content: jitData?.content || '',
    }
    const isNeed =
      (type === 'new' && name) ||
      (type === 'edit' && name && !compareObjects(originValues, formValues))

    return isNeed
  }, [jitData, form, editorContent, type])

  const onSaveForm = useCallback(
    (payload, actionType, backLink) => {
      setIsLoadStatus(actionType)

      if (type === 'new') {
        createEducation(payload)
          .then((res) => {
            setIsLoadStatus('')

            if (actionType === PUBLISHED_STATE.INREVIEW) {
              notification.success({
                message: 'A new JIT Education has been created successfully!',
              })
              navigate('/education/review', { state: { id: res.data.jit_id, ...payload } })
            } else if (actionType === PUBLISHED_STATE.DRAFT) {
              notification.success({
                message: 'A new JIT Education draft has been created successfully!',
              })

              backLink && navigate(backLink)
            }
          })
          .catch((error) => {
            setIsLoadStatus('')

            notification.error({
              message: 'Add Failure',
              description: error?.data || '',
            })
          })
      } else {
        const id = jitData?.id

        updateEducation(id, payload)
          .then(() => {
            setIsLoadStatus('')

            if (actionType === PUBLISHED_STATE.INREVIEW) {
              notification.success({ message: 'A JIT Education has been updated successfully!' })
              navigate('/education/review', { state: { id, ...payload } })
            } else if (actionType === PUBLISHED_STATE.DRAFT) {
              notification.success({ message: 'A draft has been updated successfully!' })
              backLink && navigate(backLink)
            }
          })
          .catch((error) => {
            setIsLoadStatus('')

            notification.error({
              message: 'Upate Failure',
              description: error?.data || '',
            })
          })
      }
    },
    [jitData, type, navigate]
  )

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      content: editorContent,
      status: PUBLISHED_STATE.INREVIEW,
    }

    onSaveForm(payload, PUBLISHED_STATE.INREVIEW)
  }

  const onClose = () => {
    const backLink = '/education/list'

    if (isChanged()) {
      confirm({
        title: 'Save changes',
        icon: <ExclamationCircleOutlined />,
        content: 'Do you want to save your changes before leaving this page?',
        onOk() {
          const payload = {
            name: form.getFieldValue('name'),
            content: editorContent,
            status: PUBLISHED_STATE.DRAFT,
          }

          onSaveForm(payload, PUBLISHED_STATE.DRAFT, backLink)
        },
        onCancel() {
          navigate(backLink)
        },
      })
    } else {
      navigate(backLink)
    }
  }

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          form={form}
          autoComplete="off"
          initialValues={jitData || {}}
          layout="vertical"
          name="education"
          onFinish={onFinish}
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
              data={jitData?.content}
              onChange={(_event, editor) => {
                setEditorContent(editor.getData())
              }}
            />
          </Form.Item>
          <FormActionButtons>
            {type !== 'new' ? (
              <Button type="link" size="large" danger>
                Delete Draft
              </Button>
            ) : (
              <span />
            )}
            <Space>
              <Button
                size="large"
                htmlType="submit"
                loading={isLoadStatus === PUBLISHED_STATE.INREVIEW}
                disabled={isLoadStatus}
              >
                Send to Review
              </Button>
              <Button
                size="large"
                onClick={onClose}
                loading={isLoadStatus === PUBLISHED_STATE.DRAFT}
                disabled={isLoadStatus}
              >
                Close
              </Button>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default EducationForm
