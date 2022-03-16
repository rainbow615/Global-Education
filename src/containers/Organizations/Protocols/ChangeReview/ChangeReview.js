import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'

import { deleteProtocol, updateProtocol } from '../../../../services/protocolService'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../../components/CommonComponent'
import ConfirmActionButton from '../../../../components/ConfirmActionButton'
import { PROTOCOL_ACTIONS, PROTOCOLS_CONFIRM_MSG } from '../../../../config/constants'
import { Root, Topbar } from './styles'

const ChangeReview = (props) => {
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
      title: `In-Review: ${title}`,
    },
  ]

  const [isLoading, setIsLoading] = useState({ isNext: false, isBack: false })
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!data) {
      navigate(`/organizations/protocols/list`, { state: { orgId } })
    }
  })

  const onSubmit = (isNext) => () => {
    setIsLoading({ isNext, isBack: !isNext })

    const payload = {
      organization_id: orgId,
      parent_id: data?.parent_id || null,
      protocol_name: data.protocol_name,
      protocol_number: data.protocol_number,
      category_id: data.category_id,
      tags: data.tags,
      status: isNext ? PROTOCOL_ACTIONS.APPROVED : PROTOCOL_ACTIONS.DRAFT,
    }

    updateProtocol(id, payload)
      .then((res) => {
        setIsLoading({ isNext: false, isBack: false })
        if (isNext) notification.success({ message: 'A protocol has been updated successfully!' })

        const resData = res?.data || {}
        navigate(isNext ? '/organizations/protocols/proof' : '/organizations/protocols/form/edit', {
          state: { orgId, ...resData },
        })
      })
      .catch((error) => {
        setIsLoading({ isNext: false, isBack: false })

        notification.error({
          message: 'Upate Failure',
          description: error?.data || '',
        })
      })
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteProtocol(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({
          message: `A protocol has been deleted successfully!`,
        })
        navigate('/organizations/protocols/list', { state: { orgId } })
      })
      .catch((error) => {
        setIsDeleting(false)

        notification.error({
          message: 'Delete Failure',
          description: error?.data || '',
        })
      })
  }

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        <Button
          size="large"
          type="link"
          icon={<RollbackOutlined />}
          onClick={onSubmit(false)}
          loading={isLoading.isBack}
        >
          &nbsp;Send Back to Build
        </Button>
      </Topbar>
      <Root>
        <div>
          <h1>---------Change Review---------</h1>
        </div>
        <FormActionButtons>
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
          <Space>
            <Button size="large">
              <RouterLink to={`/organizations/protocols/list`} state={{ orgId }}>
                Close
              </RouterLink>
            </Button>
            <Button size="large" onClick={onSubmit(true)} loading={isLoading.isNext}>
              Accept Changes
            </Button>
          </Space>
        </FormActionButtons>
      </Root>
    </React.Fragment>
  )
}

export default ChangeReview
