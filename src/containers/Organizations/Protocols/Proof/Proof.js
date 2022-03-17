import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined, CheckOutlined } from '@ant-design/icons'

import { deleteProtocol, updateProtocol } from '../../../../services/protocolService'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../../components/CommonComponent'
import ConfirmActionButton from '../../../../components/ConfirmActionButton'
import { PROTOCOL_ACTIONS, PROTOCOLS_CONFIRM_MSG } from '../../../../config/constants'
import { Root, Topbar } from './styles'

const Proof = (props) => {
  const { orgId } = props
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
      title: 'Protocols',
      link: '/organizations/protocols/list',
      state: { orgId },
    },
    {
      title: `Proof: ${title}`,
    },
  ]

  const [isLoading, setIsLoading] = useState({ isNext: false, isBack: false })
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [protocolStatus, setProtocolStatus] = useState(data?.status)
  const [lastPublishedDate, setLastPublishedDate] = useState(data?.last_published_date)

  useEffect(() => {
    if (!data) {
      navigate(`/organizations/protocols/list`, { state: { orgId } })
    }
  })

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

  const onUpdate = () => {}

  const onDelete = () => {
    setIsDeleting(true)

    deleteProtocol(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({
          message: `Protocol has been deleted successfully!`,
        })
        navigate('/organizations/protocols/list', { state: { orgId } })
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
      <Root>
        <div>
          <h1>--------Proof------------</h1>
        </div>
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
              <RouterLink to={`/organizations/protocols/list`} state={{ orgId }}>
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
              message={PROTOCOLS_CONFIRM_MSG.PUBLISHED}
            >
              Publish
            </ConfirmActionButton>
          </Space>
        </FormActionButtons>
      </Root>
    </React.Fragment>
  )
}

export default Proof
