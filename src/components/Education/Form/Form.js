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

const EducationForm = (props) => {
  const { breadCrumb, isGlobal, orgId } = props
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'
  const location = useLocation()
  const jitData = location?.state
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { type } = useParams()

  const [jitId, setJitId] = useState(jitData?.jit_id || '')
  const [editorContent, setEditorContent] = useState(jitData?.jit_content || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDisableAutoLoad, setIsDisableAutoLoad] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSaveForm = useCallback(
    (payload) => {
      setIsLoading(true)
      updateEducation(jitId, payload)
        .then(() => {
          setIsLoading(false)
          notification.success({ message: 'A JIT Education has been updated successfully!' })
          navigate(`/${prefixLink}education/review`, { state: { jit_id: jitId, orgId, ...payload } })
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Update failed!',
            description: error?.data || '',
          })
        })
    },
    [jitId, navigate, prefixLink, orgId]
  )

  const onFinish = (values) => {
    const payload = {
      organization_id: orgId || null,
      jit_name: values.jit_name,
      jit_content: editorContent,
      parent_id: jitData?.parent_id || null,
      status: JIT_ACTIONS.INREVIEW,
    }

    onSaveForm(payload)
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteEducation(jitId)
      .then(() => {
        setIsDeleting(false)
        notification.success({ message: 'The draft has been deleted successfully!' })
        navigate(`/${prefixLink}education/list`, { state: { orgId } })
      })
      .catch((error) => {
        setIsDeleting(false)

        notification.error({
          message: 'Delete failed!',
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
      organization_id: orgId || null,
      jit_name: form.getFieldValue('jit_name') || 'Untitled',
      jit_content: content,
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
            name="jit_name"
            hasFeedback
            rules={[{ required: true, message: 'Please input a name' }]}
            validateStatus={errorMsg ? 'error' : undefined}
            help={errorMsg}
          >
            <Input placeholder="Name *" size="large" onChange={(e) => debouncedChangeHandler()} />
          </Form.Item>
          <Form.Item>
            <CustomCkEditor
              data={jitData?.jit_content}
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
                loading={isDeleting}
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
                loading={isLoading}
                disabled={isLoading || isDisableAutoLoad || !jitId || errorMsg}
              >
                Send to Review
              </Button>
              <Button size="large">
                <Link to={`/${prefixLink}education/list`} state={{ orgId }}>
                  Close
                </Link>
              </Button>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default EducationForm
