import React, { useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, Typography, notification } from 'antd'
import { RollbackOutlined, CheckOutlined } from '@ant-design/icons'

import { createEducation, updateEducation, deleteEducation } from '../../../services/jitService'
import { JIT_ACTIONS, JIT_CONFIRM_MSG } from '../../../config/constants'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import ConfirmActionButton from '../../../components/ConfirmActionButton'

import { Root, Topbar, Section, HTMLViewer } from './styles'

const { Text } = Typography

const ChangeReview = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const title = data?.name || ''
  const content = data?.content || ''

  const breadCrumb = [
    {
      title: 'JIT Education',
      link: '/education',
    },
    {
      title: title,
      link: '/education/form/edit',
      state: data,
    },
    {
      title: 'Change Review',
    },
  ]

  const [isLoad, setIsLoad] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [jitStatus, setJitStatus] = useState(data.status)

  const onSubmit = () => {
    let status = JIT_ACTIONS.UNPUBLISHED

    if (jitStatus !== JIT_ACTIONS.PUBLISHED) {
      status = JIT_ACTIONS.PUBLISHED
    }

    const payload = {
      organization_id: null,
      parent_id: null,
      name: data.name,
      content: data.content,
      status,
    }

    setIsLoad(true)
    updateEducation(data.id, payload)
      .then(() => {
        setIsLoad(false)
        setJitStatus(status)
        notification.success({
          message: `A JIT Education has been ${
            status === JIT_ACTIONS.PUBLISHED ? 'published' : 'unpublished'
          } successfully!`,
        })
      })
      .catch((error) => {
        setIsLoad(false)

        notification.error({
          message: 'Upate Failure',
          description: error?.data || '',
        })
      })
  }

  const onUpdate = () => {
    const payload = {
      organization_id: null,
      parent_id: data.id,
      name: data.name,
      content: data.content,
      status: JIT_ACTIONS.DRAFT,
    }

    setIsUpdate(true)

    createEducation(payload).then((res) => {
      const newId = res.data.jit_id

      setIsUpdate(false)

      navigate('/education/form/edit', { state: { id: newId, ...payload } })
    })
  }

  const onDelete = () => {
    setIsDelete(true)

    deleteEducation(data.id)
      .then(() => {
        setIsDelete(false)
        notification.success({ message: 'A JIT Education has been deleted successfully!' })
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

  const isPublish = jitStatus === JIT_ACTIONS.PUBLISHED

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        <Button type="link" icon={<RollbackOutlined />}>
          <RouterLink to="/education/form/edit" state={data}>
            &nbsp;Send Back to Editor
          </RouterLink>
        </Button>
      </Topbar>

      <Root>
        <Section>
          <Text>Current draft</Text>
          <HTMLViewer className="wyswyg-editor" dangerouslySetInnerHTML={{ __html: content }} />
        </Section>
      </Root>
      <FormActionButtons>
        {isPublish && (
          <ConfirmActionButton
            type="link"
            size="large"
            danger
            onClick={onSubmit}
            loading={isPublish && isLoad}
            actionType={JIT_ACTIONS.UNPUBLISHED}
            message={JIT_CONFIRM_MSG.UNPUBLISHED}
          >
            Unpublish
          </ConfirmActionButton>
        )}
        {!isPublish && (
          <ConfirmActionButton
            type="link"
            size="large"
            danger
            loading={isDelete}
            onClick={onDelete}
            actionType={JIT_ACTIONS.DELETE}
            message={JIT_CONFIRM_MSG.DELETE}
          >
            Delete
          </ConfirmActionButton>
        )}
        <Space>
          {isPublish && (
            <Button size="large" onClick={onUpdate} loading={isUpdate}>
              Update
            </Button>
          )}
          <Button size="large">
            <RouterLink to="/education/list">Close</RouterLink>
          </Button>
          <ConfirmActionButton
            size="large"
            className={isPublish ? 'published' : ''}
            icon={isPublish ? <CheckOutlined /> : null}
            onClick={onSubmit}
            loading={!isPublish && isLoad}
            disabled={isPublish}
            actionType={JIT_ACTIONS.PUBLISHED}
            message={JIT_CONFIRM_MSG.PUBLISHED}
          >
            Publish
          </ConfirmActionButton>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default ChangeReview
