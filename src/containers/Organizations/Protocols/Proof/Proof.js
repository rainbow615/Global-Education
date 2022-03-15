import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'

import { deleteProtocol } from '../../../../services/protocolService'
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

  const [isLoad, setIsLoad] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!data) {
      navigate(`/organizations/protocols/list`, { state: { orgId } })
    }
  })

  const onSubmit = () => {}

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
        <Button type="link" icon={<RollbackOutlined />}>
          <RouterLink to={`/organizations/protocols/form/edit`} state={data}>
            &nbsp;Send Back to Review
          </RouterLink>
        </Button>
      </Topbar>
      <Root>
        <div>
          <h1>--------Proof------------</h1>
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
            <Button size="large" onClick={onSubmit} loading={isLoad}>
              Publish
            </Button>
          </Space>
        </FormActionButtons>
      </Root>
    </React.Fragment>
  )
}

export default Proof
