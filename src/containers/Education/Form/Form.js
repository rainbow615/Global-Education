import React, { useState, useCallback } from 'react'
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom'
import { debounce } from 'lodash'
import { Form, Input, Button, Space, message, notification } from 'antd'

import { createEducation, updateEducation, deleteEducation } from '../../../services/jitService'
import { JIT_ACTIONS, AUTO_SAVE_DELAY, JIT_CONFIRM_MSG } from '../../../config/constants'
import CustomCkEditor from '../../../components/CustomCkEditor/CustomCkEditor'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import ConfirmActionButton from '../../../components/ConfirmActionButton'
import { Root } from './styles'

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

  const [jitId, setJitId] = useState(jitData?.id || '')
  const [editorContent, setEditorContent] = useState(jitData?.content || '')
  const [isLoad, setIsLoad] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isDisableAutoLoad, setIsDisableAutoLoad] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSaveForm = useCallback(
    (payload) => {
      setIsLoad(true)
      updateEducation(jitId, payload)
        .then(() => {
          setIsLoad(false)
          notification.success({ message: 'A JIT Education has been updated successfully!' })
          navigate('/education/review', { state: { id: jitId, ...payload } })
        })
        .catch((error) => {
          setIsLoad(false)

          notification.error({
            message: 'Upate Failure',
            description: error?.data || '',
          })
        })
    },
    [jitId, navigate]
  )

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      content: editorContent,
      parentId: jitData?.parentId || null,
      status: JIT_ACTIONS.UNPUBLISHED,
    }

    onSaveForm(payload)
  }

  const onDelete = () => {
    setIsDelete(true)

    deleteEducation(jitId)
      .then(() => {
        setIsDelete(false)
        notification.success({ message: 'The draft has been deleted successfully!' })
        navigate('/education/list')
      })
      .catch((error) => {
        setIsDelete(false)

        notification.error({
          message: 'Delete Failure',
          description: error?.data || '',
        })
      })
  }

  const onChangeValues = (value, fieldName) => {
    let content = editorContent

    if (fieldName === 'content') {
      setEditorContent(value)
      content = value
    }

    const payload = {
      name: form.getFieldValue('name') || 'Untitled',
      content: content,
      status: JIT_ACTIONS.DRAFT,
    }

    if (!isDisableAutoLoad) {
      const hide = message.loading('Saving...', 0)

      if (!jitId) {
        setIsDisableAutoLoad(true)

        createEducation(payload)
          .then((res) => {
            setIsDisableAutoLoad(false)
            setTimeout(hide, 0)
            setErrorMsg('')

            if (res?.data?.jit_id) setJitId(res.data.jit_id)
          })
          .catch((error) => {
            setIsDisableAutoLoad(false)
            setTimeout(hide, 0)

            if (error?.status === 500) {
              setErrorMsg(error?.data || '')
            }
          })
      } else {
        updateEducation(jitId, payload)
          .then(() => {
            setTimeout(hide, 0)
            setErrorMsg('')
          })
          .catch((error) => {
            setTimeout(hide, 0)

            if (error?.status === 500) {
              setErrorMsg(error?.data || '')
            }
          })
      }
    }
  }

  const debouncedChangeHandler = debounce(onChangeValues, AUTO_SAVE_DELAY)

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
            validateStatus={errorMsg ? 'error' : undefined}
            help={errorMsg}
          >
            <Input placeholder="Name *" size="large" onChange={(e) => debouncedChangeHandler()} />
          </Form.Item>
          <Form.Item className="wyswyg-editor">
            <CustomCkEditor
              data={jitData?.content}
              onChange={(_event, editor) => {
                debouncedChangeHandler(editor.getData(), 'content')
              }}
            />
          </Form.Item>
          <FormActionButtons>
            {type !== 'new' || jitId ? (
              <ConfirmActionButton
                type="link"
                size="large"
                danger
                onClick={onDelete}
                loading={isDelete}
                actionType={JIT_ACTIONS.DELETE}
                message={JIT_CONFIRM_MSG.DELETE_DRAFT}
              >
                Delete Draft
              </ConfirmActionButton>
            ) : (
              <span />
            )}
            <Space>
              <Button
                size="large"
                htmlType="submit"
                loading={isLoad}
                disabled={isLoad || isDisableAutoLoad || !jitId || errorMsg}
              >
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
