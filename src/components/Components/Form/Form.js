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
  const { children, orgId, isNew, isLoading, initialValues, onCreate, onEdit } = props

  const [selectedEducations, setSelectedEducations] = useState([])

  const onChangeEducationsList = (values) => {
    setSelectedEducations(values)
  }

  const handleNewFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const ids = selectedEducations.map((val) => val.jit_id)
        onCreate({ ...values, linked_education: ids })
      })
      .catch((errorInfo) => {
        console.log(errorInfo)
      })
  }

  const handleEditFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const ids = selectedEducations.map((val) => val.jit_id)
        onEdit({ ...initialValues, ...values, linked_education: ids })
      })
      .catch((errorInfo) => {
        console.log(errorInfo)
      })
  }

  const onDelete = () => {}

  return (
    <Root>
      <Form
        form={form}
        autoComplete="nope"
        initialValues={initialValues}
        layout="vertical"
        name="organizations"
      >
        <div>{children}</div>
        <BottomSection size="large">
          {!isNew && <ProtocolsSection />}
          <EducationsSection
            orgId={orgId}
            data={initialValues?.linked_education || []}
            onChangeList={onChangeEducationsList}
          />
        </BottomSection>
        <FormActionButtons>
          {!isNew ? (
            <ConfirmActionButton
              type="link"
              size="large"
              danger
              loading={isLoading.delete}
              onClick={onDelete}
              actionType="DELETE"
              message={COMPONENTS_CONFIRM_MSG.DELETE}
            >
              Delete
            </ConfirmActionButton>
          ) : (
            <div />
          )}
          <Space>
            <Button
              size="large"
              loading={isLoading.create}
              type={isNew ? 'primary' : 'default'}
              onClick={handleNewFormSubmit}
            >
              Save as New
            </Button>
            {!isNew && (
              <Button
                size="large"
                loading={isLoading.edit}
                type="primary"
                onClick={handleEditFormSubmit}
              >
                Modify Everywhere
              </Button>
            )}
          </Space>
        </FormActionButtons>
      </Form>
    </Root>
  )
}

export default ComponentForm
