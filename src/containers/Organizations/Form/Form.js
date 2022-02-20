import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Form, Input, Select, Button, Space, notification } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import {
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from '../../../services/organizations'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import { OrgActionsButton } from './ActionButtons'
import { PUBLISHED_STATE, TYPES, ORG_ACTIONS } from '../../../config/constants'
import States from '../../../config/states.json'
import { Root } from './styles'

const { Option } = Select

const OrganizationsForm = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const { type } = useParams()
  const breadCrumb = [
    {
      title: 'Organizations',
    },
    {
      title: type === 'new' ? 'Add' : 'Edit',
    },
  ]
  const id = location?.state?.id

  const [isLoading, setIsLoading] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [initial, setInitial] = useState()

  useEffect(() => {
    form.setFieldsValue({ region: 'North America' })
  }, [form])

  const onFinish = (values) => {
    const payload = {
      organization_name: values.name,
      organization_description: values.description,
      state: values.state,
      type: values.type,
      region: values.region,
      status: 'UNPUBLISHED',
    }

    setIsLoading(true)

    if (type === 'new') {
      createOrganization(payload)
        .then((res) => {
          setIsLoading(false)
          notification.success({ message: 'A new organization has been created successfully!' })

          if (res && res.data && res.data[0]) {
            const record = {
              key: 0,
              id: res.data[0].organization_id,
              name: res.data[0].organization_name,
              description: res.data[0].organization_description,
              type: res.data[0].type,
              region: res.data[0].region,
              state: res.data[0].state,
              status: res.data[0].status,
            }

            navigate('/organizations/form/edit', { state: record })
          }
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Add Failure',
            description: error?.data || '',
          })
        })
    } else {
      updateOrganization(id, payload)
        .then(() => {
          setIsLoading(false)
          setInitial(values)
          notification.success({ message: 'A organization has been updated successfully!' })
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Upate Failure',
            description: error?.data || '',
          })
        })
    }
  }

  const onFinishFailed = () => {}

  const onTogglePublish = (isPublish) => () => {
    const org = location.state
    const payload = {
      organization_name: org.name,
      organization_description: org.description,
      state: org.state,
      type: org.type,
      region: org.region,
      status: isPublish ? PUBLISHED_STATE.PUBLISHED : PUBLISHED_STATE.UNPUBLISHED,
    }

    setIsPublishing(true)

    updateOrganization(id, payload)
      .then((result) => {
        setIsPublishing(false)

        if (result?.data) {
          setInitial(result?.data[0])
          notification.success({
            message: `A organization has been ${isPublish ? '' : 'un'}published successfully!`,
          })
        }
      })
      .catch((error) => {
        setIsPublishing(false)

        notification.error({
          message: 'Publish Failure',
          description: error?.data || '',
        })
      })
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteOrganization(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({
          message: `A organization has been deleted successfully!`,
        })
        navigate('/organizations/list')
      })
      .catch((error) => {
        setIsDeleting(false)

        notification.error({
          message: 'Delete Failure',
          description: error?.data || '',
        })
      })
  }

  const isCheckPublish =
    (!initial && location?.state?.status === PUBLISHED_STATE.PUBLISHED) ||
    initial?.status === PUBLISHED_STATE.PUBLISHED

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          form={form}
          autoComplete="nope"
          initialValues={initial || location.state}
          layout="vertical"
          name="organizations"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            hasFeedback
            rules={[{ required: true, message: 'Please input Name' }]}
          >
            <Input placeholder="Name *" size="large" />
          </Form.Item>
          <Form.Item name="description" hasFeedback>
            <Input.TextArea
              showCount
              maxLength={1000}
              rows="5"
              size="large"
              placeholder="Description..."
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              label="Type"
              name="type"
              className="type"
              hasFeedback
              rules={[{ required: true, message: 'Please select Type' }]}
            >
              <Select
                placeholder="Type"
                size="large"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {TYPES.map((type) => (
                  <Option key={type.id} value={type.name}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Region"
              name="region"
              className="region"
              hasFeedback
              rules={[{ required: true, message: 'Please input Region' }]}
            >
              <Input placeholder="Region *" size="large" disabled />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              className="state"
              rules={[{ required: true, message: 'Please select State' }]}
            >
              <Select
                autoComplete="nope"
                placeholder="State"
                size="large"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {States.map((state, index) => (
                  <Option key={index} value={state.abbreviation}>
                    {state.abbreviation}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>

          <FormActionButtons>
            {type !== 'new' ? (
              <OrgActionsButton
                type="link"
                size="large"
                danger
                loading={(isCheckPublish && isPublishing) || isDeleting}
                onClick={isCheckPublish ? onTogglePublish(false) : onDelete}
                actionType={isCheckPublish ? ORG_ACTIONS.UNPUBLISHED : ORG_ACTIONS.DELETE}
              >
                {isCheckPublish ? 'Unpublish' : 'Delete'}
              </OrgActionsButton>
            ) : (
              <div />
            )}
            <Space>
              <Button size="large" htmlType="submit" loading={isLoading}>
                {type === 'new' ? 'Add' : 'Update'}
              </Button>
              <OrgActionsButton
                size="large"
                className={isCheckPublish ? 'published' : ''}
                icon={isCheckPublish ? <CheckOutlined /> : null}
                disabled={type === 'new' || isCheckPublish}
                onClick={onTogglePublish(true)}
                loading={!isCheckPublish && isPublishing}
                actionType={ORG_ACTIONS.PUBLISHED}
              >
                {isCheckPublish ? 'Published' : 'Publish'}
              </OrgActionsButton>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default OrganizationsForm
