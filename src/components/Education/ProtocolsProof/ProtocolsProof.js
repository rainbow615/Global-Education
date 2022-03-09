import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined, CheckOutlined } from '@ant-design/icons'

import {
  createEducation,
  updateEducation,
  deleteEducation,
  useEducation,
} from '../../../services/jitService'
import { JIT_ACTIONS, JIT_CONFIRM_MSG } from '../../../config/constants'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import CustomLoading from '../../../components/Loading/Loading'
import ConfirmActionButton from '../../../components/ConfirmActionButton'
import { ResultFailed } from '../../../components/ResultPages'

import {
  Root,
  Topbar,
  TitleBar,
  MobielViewer,
  BookViewer,
  ViewerContainer,
  HTMLViewer,
} from './styles'

const ProtocolsProof = (props) => {
  const { breadCrumb, isGlobal, orgId } = props
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const title = data?.name || ''
  const content = data?.content || ''

  const [isLoad, setIsLoad] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [jitStatus, setJitStatus] = useState(data?.status)

  useEffect(() => {
    if (!data) {
      navigate(`/${prefixLink}education/list`, { state: { orgId } })
    }
  })

  const { data: parentJit, error } = useEducation(data?.parent_id || null)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (parentJit?.isLoading) {
    return <CustomLoading />
  }

  const onSubmit = () => {
    let updateId = data.id
    let status = JIT_ACTIONS.UNPUBLISHED

    if (jitStatus !== JIT_ACTIONS.PUBLISHED) {
      status = JIT_ACTIONS.PUBLISHED
    }

    const payload = {
      organization_id: orgId || null,
      parent_id: data.parent_id,
      name: data.name,
      content: data.content,
      status,
    }

    setIsLoad(true)
    updateEducation(updateId, payload)
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
      organization_id: orgId || null,
      parent_id: data.id,
      name: data.name,
      content: data.content,
      status: JIT_ACTIONS.DRAFT,
    }

    setIsUpdate(true)

    createEducation(payload).then((res) => {
      const newId = res.data.jit_id

      setIsUpdate(false)

      navigate(`/${prefixLink}education/form/edit`, { state: { id: newId, orgId, ...payload } })
    })
  }

  const onDelete = () => {
    setIsDelete(true)

    deleteEducation(data.id)
      .then(() => {
        setIsDelete(false)
        notification.success({ message: 'A JIT Education has been deleted successfully!' })
        navigate(`/${prefixLink}education/list`)
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
  const parentJitData = parentJit?.data && parentJit.data.length > 0 ? parentJit.data[0] : null
  const publicConfirmMsg = `${
    data.parent_id
      ? `This document is a copy of "${parentJitData.document_number}: ${parentJitData.jit_name}" and will replace that document when published. \n\n`
      : ''
  }${JIT_CONFIRM_MSG.PUBLISHED}`

  console.log('=============', data)

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        {!isPublish && (
          <Button type="link" icon={<RollbackOutlined />}>
            <RouterLink to={`/${prefixLink}education/review`} state={data}>
              &nbsp;Send Back to Review
            </RouterLink>
          </Button>
        )}
      </Topbar>
      <Root>
        <MobielViewer>
          <ViewerContainer>
            <TitleBar>{title}</TitleBar>
            <HTMLViewer className="wyswyg-editor" dangerouslySetInnerHTML={{ __html: content }} />
          </ViewerContainer>
        </MobielViewer>
        <BookViewer>
          <ViewerContainer>
            <TitleBar>{title}</TitleBar>
            <HTMLViewer className="wyswyg-editor" dangerouslySetInnerHTML={{ __html: content }} />
          </ViewerContainer>
        </BookViewer>
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
            <RouterLink to={`/${prefixLink}education/list`} state={{ orgId }}>
              Close
            </RouterLink>
          </Button>
          <ConfirmActionButton
            size="large"
            className={isPublish ? 'published' : ''}
            icon={isPublish ? <CheckOutlined /> : null}
            onClick={onSubmit}
            loading={!isPublish && isLoad}
            disabled={isPublish}
            actionType={JIT_ACTIONS.PUBLISHED}
            message={publicConfirmMsg}
          >
            Publish
          </ConfirmActionButton>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default ProtocolsProof
