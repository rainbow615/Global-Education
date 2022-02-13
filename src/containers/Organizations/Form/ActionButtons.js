import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { ORG_ACTIONS } from '../../../config/constants'
import { ConfirmModalBody } from './styles'

export const OrgActionsButton = (props) => {
  const { children, actionType, onClick, ...rest } = props

  const [visible, setVisible] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const onClickButton = () => {
    setVisible(true)
  }

  const onOkEvent = () => {
    setVisible(false)

    if (confirmText) onClick && onClick()
  }

  let isPass = false

  if (actionType === ORG_ACTIONS.DELETE && confirmText === 'DELETE') isPass = true
  if (actionType === ORG_ACTIONS.UNPUBLISHED && confirmText === 'UNPUBLISH') isPass = true
  if (actionType === ORG_ACTIONS.PUBLISHED && confirmText === 'PUBLISH') isPass = true

  return (
    <React.Fragment>
      <Button {...rest} onClick={onClickButton}>
        {children}
      </Button>
      <Modal
        title={null}
        closable={false}
        visible={visible}
        footer={false}
        centered
        onCancel={() => setVisible(false)}
      >
        <ConfirmModalBody>
          <div className="title">
            <ExclamationCircleOutlined />
            {actionType === ORG_ACTIONS.DELETE && `Delete Warning`}
            {actionType === ORG_ACTIONS.UNPUBLISHED && `Unpulbish Warning`}
            {actionType === ORG_ACTIONS.PUBLISHED && `Pulbish Warning`}
          </div>
          <div className="description">
            {actionType === ORG_ACTIONS.DELETE &&
              `You are deleting this organization. This organization and all of its data will not be recoverable. Type 'DELETE' to confirm.`}
            {actionType === ORG_ACTIONS.UNPUBLISHED &&
              `You are unpublishing this organization. This will make the organization no longer available in the MCP mobile application and bookstore. Type 'UNPUBLISH' to confirm.`}
            {actionType === ORG_ACTIONS.PUBLISHED &&
              `You are publishing this organization. This will make the organization available in the MCP mobile application and bookstore. Type 'PUBLISH' to confirm.`}
          </div>
          <div>
            <Input onChange={(e) => setConfirmText(e.target.value)} />
          </div>
          <div className="actions">
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={onOkEvent} disabled={!isPass}>
              Ok
            </Button>
          </div>
        </ConfirmModalBody>
      </Modal>
    </React.Fragment>
  )
}
