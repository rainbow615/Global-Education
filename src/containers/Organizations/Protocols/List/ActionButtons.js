import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Space, notification } from 'antd'

import { PROTOCOL_ACTIONS } from '../../../../config/constants'
import { updateProtocol, updateAllProtocols } from '../../../../services/protocolService'

const ActionButtons = (props) => {
  const { orgId, orgName, data, mutate } = props

  const [isApproving, setIsApproving] = useState(false)
  const [isPublishing, setIsPublishin] = useState(false)

  const onUpdateAllProtocols = (orginStatus, newStatus) => () => {
    const updatingData = data.filter((obj) => obj.status === orginStatus)

    if (updatingData.length <= 0) {
      notification.error({ message: 'No protocols require this action currently.' })
      return
    }

    try {
      const requests = updatingData.map((obj) => {
        const payload = { ...obj, status: newStatus }
        return updateProtocol(obj.protocol_id, payload)
      })

      if (newStatus === PROTOCOL_ACTIONS.APPROVED) setIsApproving(true)
      if (newStatus === PROTOCOL_ACTIONS.PUBLISHED) setIsPublishin(true)

      updateAllProtocols(requests)
        .then(
          axios.spread(() => {
            setIsApproving(false)
            setIsPublishin(false)

            mutate()
          })
        )
        .catch((error) => {
          setIsApproving(false)
          setIsPublishin(false)

          notification.error({
            message: 'Update failed!',
            description: error?.data || '',
          })
        })
    } catch {
      setIsApproving(false)
      setIsPublishin(false)
    }
  }

  return (
    <Space>
      <Button type="primary">
        <Link to="/organizations/protocols/form/new" state={{ orgId, orgName }}>
          Add new
        </Link>
      </Button>
      <Button
        type="primary"
        loading={isApproving}
        disabled={isApproving}
        onClick={onUpdateAllProtocols(PROTOCOL_ACTIONS.INREVIEW, PROTOCOL_ACTIONS.APPROVED)}
      >
        Approve All
      </Button>
      <Button
        type="primary"
        loading={isPublishing}
        disabled={isPublishing}
        onClick={onUpdateAllProtocols(PROTOCOL_ACTIONS.APPROVED, PROTOCOL_ACTIONS.PUBLISHED)}
      >
        Publish All
      </Button>
    </Space>
  )
}

export default ActionButtons
