import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Space, notification } from 'antd'
import _ from 'lodash'

import { deleteComponent } from '../../../services/componentService'
import { COMPONENTS_CONFIRM_MSG } from '../../../config/constants'
import { FormActionButtons } from '../../CommonComponent'
import ConfirmActionButton from '../../ConfirmActionButton'
import ProtocolsSection from './ProtocolsSection'
import EducationsSection from './EducationsSection'
import { Root, BottomSection } from './styles'

const ComponentForm = (props) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const {
    children,
    orgId,
    orgName,
    isNew,
    isLoading,
    isChanged = true,
    initialValues,
    onCreate,
    onEdit,
    onChangeValue,
  } = props
  const backref = initialValues?.backref

  const [selectedEducationsIds, setSelectedEducationsIds] = useState(
    initialValues?.linked_education || []
  )
  const [isDeleting, setIsDeleting] = useState(false)

  const onChangeFieldValue = (changedField) => {
    if (onChangeValue) {
      const educations =
        changedField.name === 'linked_education' ? changedField.value : selectedEducationsIds
      onChangeValue({ ...form.getFieldsValue(true), linked_education: educations }, changedField)
    }
  }

  const onCheckValueChange = (e) => {
    if (e.length > 0) {
      onChangeFieldValue({
        name: _.get(e, '[0].name[0]'),
        value: _.get(e, '[0].value'),
      })
    }
  }

  const onChangeEducationsList = (values) => {
    const cloneValues = [...values]
    const ids = cloneValues.map((val) => val.jit_id)
    setSelectedEducationsIds(ids)

    onChangeFieldValue({
      name: 'linked_education',
      value: ids,
    })
  }

  const handleNewFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate({ ...values, linked_education: selectedEducationsIds })
      })
      .catch((errorInfo) => {
        console.log(errorInfo)
      })
  }

  const handleEditFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onEdit({ ...initialValues, ...values, linked_education: selectedEducationsIds })
      })
      .catch((errorInfo) => {
        console.log(errorInfo)
      })
  }

  const onDelete = () => {
    if (backref && backref.length > 0) {
      notification.error({
        message: 'Delete failed!',
        description: 'Cannot delete when in use by one or more protocols.',
      })
    } else {
      const id = initialValues.component_id

      setIsDeleting(true)

      deleteComponent(id)
        .then(() => {
          setIsDeleting(false)
          notification.success({
            message: `A component has been deleted successfully!`,
          })
          navigate('/organizations/components/list', {
            state: { orgId, orgName: initialValues.orgName },
          })
        })
        .catch((error) => {
          setIsDeleting(false)

          notification.error({
            message: 'Delete failed!',
            description: error?.data || '',
          })
        })
    }
  }

  return (
    <Root>
      <Form
        form={form}
        autoComplete="nope"
        initialValues={initialValues}
        layout="vertical"
        name="organizations"
        onFieldsChange={onCheckValueChange}
      >
        <div>{children}</div>
        <BottomSection size="large">
          {!isNew && <ProtocolsSection />}
          <EducationsSection
            orgId={orgId}
            data={selectedEducationsIds}
            onChangeList={onChangeEducationsList}
          />
        </BottomSection>
        <FormActionButtons>
          {!isNew ? (
            <ConfirmActionButton
              type="link"
              size="large"
              danger
              loading={isDeleting}
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
            <Button size="large">
              <Link to={`/organizations/components/list`} state={{ orgId, orgName }}>
                Close
              </Link>
            </Button>
            {isChanged && (
              <React.Fragment>
                <Button
                  size="large"
                  loading={isLoading.create}
                  type={isNew ? 'primary' : 'secondary'}
                  onClick={handleNewFormSubmit}
                >
                  Save as New
                </Button>
                {!isNew && !!backref && backref.length > 0 && (
                  <ConfirmActionButton
                    size="large"
                    loading={isLoading.edit}
                    type="secondary"
                    actionType="UPDATE"
                    message={`This component is being used in ${backref?.length} protocols. Updating this component will create a draft of every protocol. You will need to go to the protocol list for your organization and publish those drafts for the updated protocol to be available to users. \n\n Please type 'UPDATE' to confirm.`}
                    onClick={handleEditFormSubmit}
                  >
                    Modify Everywhere
                  </ConfirmActionButton>
                )}
              </React.Fragment>
            )}
          </Space>
        </FormActionButtons>
      </Form>
    </Root>
  )
}

export default ComponentForm
