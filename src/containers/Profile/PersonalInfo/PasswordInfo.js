import React from 'react'
import { Button, Modal, notification } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { requestResetPassword } from '../../../services/authService'
import { CustomStatistic } from '../styles'

const { confirm } = Modal

const PasswordInfo = (props) => {
  const { email } = props

  const onChangePassword = () => {
    if (!email) {
      notification.error({
        message: 'Chane Failure',
        description: 'We can not get your email. Please login again.',
      })

      return
    }

    confirm({
      title: 'Are you sure change your password?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, you will receive an email.',
      onOk() {
        return new Promise((resolve, reject) => {
          requestResetPassword(encodeURI(email))
            .then((res) => {
              notification.success({
                message: 'An email has been sent to you with instructions to change your password',
              })
              resolve()
            })
            .catch((error) => {
              notification.error({
                message: 'Send Failure',
                description: error?.data || '',
              })
              reject()
            })
        })
      },
      onCancel() {},
    })
  }

  return (
    <React.Fragment>
      <CustomStatistic
        title={
          <React.Fragment>
            <span>Password</span>
            <Button size="small" onClick={onChangePassword}>
              Change
            </Button>
          </React.Fragment>
        }
        value={'*'.repeat(10)}
      />
    </React.Fragment>
  )
}

export default PasswordInfo
