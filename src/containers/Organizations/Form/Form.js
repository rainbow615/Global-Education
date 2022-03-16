import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Form, Input, Select, Button, Space, notification } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import {
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from '../../../services/orgService'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import ConfirmActionButton from '../../../components/ConfirmActionButton'
import { ORG_ACTIONS, TYPES, ORG_CONFIRM_MSG } from '../../../config/constants'
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
      link: '/organizations',
    },
    {
      title: type === 'new' ? 'Add' : 'Edit',
    },
  ]
  const data = location?.state
  const id = data?.id

  const [isLoading, setIsLoading] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [initial, setInitial] = useState()
  const [errorMsg, setErrorMsg] = useState('')

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
    setErrorMsg('')

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

          if (error?.status === 500) {
            setErrorMsg(error?.data || '')
          } else {
            notification.error({
              message: 'Add Failure',
              description: error?.data || '',
            })
          }
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

          if (error?.status === 500) {
            setErrorMsg(error?.data || '')
          } else {
            notification.error({
              message: 'Update Failure',
              description: error?.data || '',
            })
          }
        })
    }
  }

  const onFinishFailed = () => {}

  const onTogglePublish = (isPublish) => () => {
    const payload = {
      organization_name: data.name,
      organization_description: data.description,
      state: data.state,
      type: data.type,
      region: data.region,
      status: isPublish ? ORG_ACTIONS.PUBLISHED : ORG_ACTIONS.UNPUBLISHED,
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
    (!initial && data?.status === ORG_ACTIONS.PUBLISHED) ||
    initial?.status === ORG_ACTIONS.PUBLISHED

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          form={form}
          autoComplete="nope"
          initialValues={initial || data}
          layout="vertical"
          name="organizations"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            hasFeedback
            validateStatus={errorMsg ? 'error' : undefined}
            help={errorMsg || null}
            rules={[{ required: true, message: 'Please input a name' }]}
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
              <ConfirmActionButton
                type="link"
                size="large"
                danger
                loading={(isCheckPublish && isPublishing) || isDeleting}
                onClick={isCheckPublish ? onTogglePublish(false) : onDelete}
                actionType={isCheckPublish ? ORG_ACTIONS.UNPUBLISHED : ORG_ACTIONS.DELETE}
                message={isCheckPublish ? ORG_CONFIRM_MSG.UNPUBLISHED : ORG_CONFIRM_MSG.DELETE}
              >
                {isCheckPublish ? 'Unpublish' : 'Delete'}
              </ConfirmActionButton>
            ) : (
              <div />
            )}
            <Space>
              <Button
                size="large"
                htmlType="submit"
                disabled={isLoading}
                loading={isLoading}
              >
                {type === 'new' ? 'Add' : 'Update'}
              </Button>
              <ConfirmActionButton
                size="large"
                className={isCheckPublish ? 'published' : ''}
                icon={isCheckPublish ? <CheckOutlined /> : null}
                disabled={type === 'new' || isCheckPublish}
                onClick={onTogglePublish(true)}
                loading={!isCheckPublish && isPublishing}
                actionType={ORG_ACTIONS.PUBLISHED}
                message={ORG_CONFIRM_MSG.PUBLISHED}
              >
                {isCheckPublish ? 'Published' : 'Publish'}
              </ConfirmActionButton>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default OrganizationsForm
