import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined, CheckOutlined } from '@ant-design/icons'

import {
  deleteProtocol,
  updateProtocol,
  createProtocol,
  useProtocol,
} from '../../../../services/protocolService'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import PreviewMobileAndBook from '../../../../components/PreviewMobileAndBook/PreviewMobileAndBook'
import { FormActionButtons } from '../../../../components/CommonComponent'
import ConfirmActionButton from '../../../../components/ConfirmActionButton'
import CustomLoading from '../../../../components/Loading/Loading'
import { ResultFailed } from '../../../../components/ResultPages'
import { PROTOCOL_ACTIONS, PROTOCOLS_CONFIRM_MSG } from '../../../../config/constants'
import { Topbar } from './styles'

const Proof = (props) => {
  const { orgId, orgName } = props
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const title = data?.protocol_name || ''
  const id = data?.protocol_id
  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: `${orgName} Protocols`,
      link: '/organizations/protocols/list',
      state: { orgId, orgName },
    },
    {
      title: `${title} Proof`,
    },
  ]

  const [isLoading, setIsLoading] = useState({ isNext: false, isBack: false })
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [protocolStatus, setProtocolStatus] = useState(data?.status)
  const [lastPublishedDate, setLastPublishedDate] = useState(data?.last_published_date)

  useEffect(() => {
    if (!data) {
      navigate(`/organizations/protocols/list`, { state: { orgId, orgName } })
    }
  })

  const { data: parentProtocol, error } = useProtocol(data?.parent_id || null)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (parentProtocol?.isLoading) {
    return <CustomLoading />
  }

  const onSubmit = (isBack) => () => {
    setIsLoading({ isNext: !isBack, isBack })

    let status = PROTOCOL_ACTIONS.UNPUBLISHED

    if (protocolStatus !== PROTOCOL_ACTIONS.PUBLISHED) {
      status = PROTOCOL_ACTIONS.PUBLISHED
    }

    const payload = {
      organization_id: orgId,
      parent_id: data?.parent_id || null,
      protocol_name: data.protocol_name,
      protocol_number: data.protocol_number,
      category_id: data.category_id,
      tags: data.tags,
      status: isBack ? PROTOCOL_ACTIONS.INREVIEW : status,
    }

    updateProtocol(id, payload)
      .then((res) => {
        setIsLoading({ isNext: false, isBack: false })

        const resData = res?.data || {}

        if (!isBack) {
          setProtocolStatus(status)
          setLastPublishedDate(resData?.last_published_date)

          notification.success({
            message: `Protocol has been ${
              status === PROTOCOL_ACTIONS.PUBLISHED ? 'published' : 'unpublished'
            } successfully!`,
          })
        }

        if (isBack) {
          navigate('/organizations/protocols/review', {
            state: { orgId, orgName, ...resData },
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
      organization_id: orgId,
      parent_id: data.protocol_id,
      protocol_name: data.protocol_name,
      protocol_number: data.protocol_number,
      category_id: data.category_id,
      tags: data.tags,
      status: PROTOCOL_ACTIONS.DRAFT,
    }

    setIsUpdating(true)

    createProtocol(payload).then((res) => {
      const newId = res.data.protocol_id

      setIsUpdating(false)

      navigate(`/organizations/protocols/form/edit`, {
        state: { orgId, orgName, protocol_id: newId, ...payload },
      })
    })
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteProtocol(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({
          message: `Protocol has been deleted successfully!`,
        })
        navigate('/organizations/protocols/list', { state: { orgId, orgName } })
      })
      .catch((error) => {
        setIsDeleting(false)

        notification.error({
          message: 'Delete failed!',
          description: error?.data || '',
        })
      })
  }

  const isPublish = protocolStatus === PROTOCOL_ACTIONS.PUBLISHED
  const parentData = parentProtocol?.data || null
  const publicConfirmMsg = `${
    data.parent_id
      ? `This protocol is a copy of "${parentData.protocol_number}: ${parentData.protocol_name}" and will replace that protocol when published. \n\n`
      : ''
  }${PROTOCOLS_CONFIRM_MSG.PUBLISHED}`
  const content = `<div>${data.protocol_number}</div>`

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
            actionType={PROTOCOL_ACTIONS.UNPUBLISHED}
            message={PROTOCOLS_CONFIRM_MSG.UNPUBLISHED}
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
            actionType={PROTOCOL_ACTIONS.DELETE}
            message={PROTOCOLS_CONFIRM_MSG.DELETE}
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
            <RouterLink to={`/organizations/protocols/list`} state={{ orgId, orgName }}>
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
            actionType={PROTOCOL_ACTIONS.PUBLISHED}
            message={publicConfirmMsg}
          >
            Publish
          </ConfirmActionButton>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default Proof
