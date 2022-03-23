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
import CustomBreadcrumb from '../../CustomBreadcrumb/CustomBreadcrumb'
import PreviewMobileAndBook from '../../PreviewMobileAndBook/PreviewMobileAndBook'
import { FormActionButtons } from '../../CommonComponent'
import CustomLoading from '../../Loading/Loading'
import ConfirmActionButton from '../../ConfirmActionButton'
import { ResultFailed } from '../../ResultPages'

import { Topbar } from './styles'

const ProtocolsProof = (props) => {
  const { breadCrumb, isGlobal, orgId } = props
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const title = data?.jit_name || ''
  const content = data?.jit_content || ''

  const [isLoading, setIsLoading] = useState({ isNext: false, isBack: false })
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [jitStatus, setJitStatus] = useState(data?.status)
  const [lastPublishedDate, setLastPublishedDate] = useState(data?.last_published_date)

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

  const onSubmit = (isBack) => () => {
    setIsLoading({ isNext: !isBack, isBack })

    let updateId = data.jit_id
    let status = JIT_ACTIONS.UNPUBLISHED

    if (jitStatus !== JIT_ACTIONS.PUBLISHED) {
      status = JIT_ACTIONS.PUBLISHED
    }

    const payload = {
      organization_id: orgId || null,
      parent_id: data.parent_id,
      jit_name: data.jit_name,
      jit_content: data.jit_content,
      status: isBack ? JIT_ACTIONS.INREVIEW : status,
    }

    updateEducation(updateId, payload)
      .then((res) => {
        setIsLoading({ isNext: false, isBack: false })

        const resData = res?.data || {}

        if (!isBack) {
          setJitStatus(status)
          setLastPublishedDate(resData?.last_published_date)

          notification.success({
            message: `A JIT Education has been ${
              status === JIT_ACTIONS.PUBLISHED ? 'published' : 'unpublished'
            } successfully!`,
          })
        }

        if (isBack) {
          navigate(`/${prefixLink}education/review`, {
            state: { orgId, ...resData },
          })
        }
      })
      .catch((error) => {
        setIsLoading({ isNext: false, isBack: false })

        notification.error({
          message: 'Update failed!',
          description: error?.data || '',
        })
      })
  }

  const onUpdate = () => {
    const payload = {
      organization_id: orgId || null,
      parent_id: data.jit_id,
      jit_name: data.jit_name,
      jit_content: data.jit_content,
      status: JIT_ACTIONS.DRAFT,
    }

    setIsUpdating(true)

    createEducation(payload).then((res) => {
      const newId = res.data.jit_id

      setIsUpdating(false)

      navigate(`/${prefixLink}education/form/edit`, { state: { jit_id: newId, orgId, ...payload } })
    })
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteEducation(data.jit_id)
      .then(() => {
        setIsDeleting(false)
        notification.success({ message: 'A JIT Education has been deleted successfully!' })
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

  const isPublish = jitStatus === JIT_ACTIONS.PUBLISHED
  const parentJitData = parentJit?.data && parentJit.data.length > 0 ? parentJit.data[0] : null
  const publicConfirmMsg = `${
    data.parent_id
      ? `This document is a copy of "${parentJitData.document_number}: ${parentJitData.jit_name}" and will replace that document when published. \n\n`
      : ''
  }${JIT_CONFIRM_MSG.PUBLISHED}`

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        {!lastPublishedDate && !isPublish && (
          <Button
            size="large"
            type="link"
            icon={<RollbackOutlined />}
            onClick={onSubmit(true)}
            loading={isLoading.isBack}
          >
            &nbsp;Send Back to Review
          </Button>
        )}
      </Topbar>
      <PreviewMobileAndBook title={title} content={content} />
      <FormActionButtons>
        {isPublish && (
          <ConfirmActionButton
            type="link"
            size="large"
            danger
            onClick={onSubmit(false)}
            loading={isPublish && isLoading.isNext}
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
            loading={isDeleting}
            onClick={onDelete}
            actionType={JIT_ACTIONS.DELETE}
            message={JIT_CONFIRM_MSG.DELETE}
          >
            Delete
          </ConfirmActionButton>
        )}
        <Space>
          {isPublish && (
            <Button size="large" onClick={onUpdate} loading={isUpdating}>
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
            onClick={onSubmit(false)}
            loading={!isPublish && isLoading.isNext}
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
