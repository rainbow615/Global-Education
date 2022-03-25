import React, { useState } from 'react'
import { Form, Button, Space } from 'antd'

import { COMPONENTS_CONFIRM_MSG } from '../../../config/constants'
import { FormActionButtons } from '../../CommonComponent'
import ConfirmActionButton from '../../ConfirmActionButton'
import ProtocolsSection from './ProtocolsSection'
import EducationsSection from './EducationsSection'
import { Root, BottomSection } from './styles'

const ComponentForm = (props) => {
  const [form] = Form.useForm()
  const { children, initialValues, onFinish } = props

  const onDelete = () => {}

  return (
    <Root>
      <Form
        form={form}
        autoComplete="nope"
        initialValues={initialValues}
        layout="vertical"
        name="organizations"
        onFinish={onFinish}
      >
        <div>{children}</div>
        <BottomSection size="large">
          <ProtocolsSection />
          <EducationsSection />
        </BottomSection>
        <FormActionButtons>
          <ConfirmActionButton
            type="link"
            size="large"
            danger
            loading={false}
            onClick={onDelete}
            actionType="DELETE"
            message={COMPONENTS_CONFIRM_MSG.DELETE}
          >
            Delete
          </ConfirmActionButton>
          <Space>
            <Button size="large" loading={false}>
              Save as New
            </Button>
            <Button size="large" loading={false} type="primary">
              Modify Everywhere
            </Button>
          </Space>
        </FormActionButtons>
      </Form>
    </Root>
  )
}

export default ComponentForm
