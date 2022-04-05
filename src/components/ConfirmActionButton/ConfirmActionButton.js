import React, { useState } from 'react'
import { Button, Input, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { ConfirmModalBody } from './styles'

const ConfirmActionButton = (props) => {
  const { children, actionType, message, onClick, ...rest } = props

  const [visible, setVisible] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const onClickButton = () => {
    setConfirmText('')
    setVisible(true)
  }

  const onOkEvent = () => {
    setVisible(false)
    setConfirmText('')

    if (confirmText) onClick && onClick()
  }

  let isPass = false

  if (actionType === 'DELETE' && confirmText === 'DELETE') isPass = true
  if (actionType === 'UNPUBLISHED' && confirmText === 'UNPUBLISH') isPass = true
  if (actionType === 'PUBLISHED' && confirmText === 'PUBLISH') isPass = true
  if (actionType === 'UPDATE' && confirmText === 'UPDATE') isPass = true

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
            {actionType === 'DELETE' && `Delete Warning`}
            {actionType === 'UNPUBLISHED' && `Unpublish Warning`}
            {actionType === 'PUBLISHED' && `Publish Warning`}
            {actionType === 'UPDATE' && `Update Warning`}
          </div>
          <div className="description">{message}</div>
          <div>
            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
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

export default ConfirmActionButton
