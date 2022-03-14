import React, { useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Select, Button, Space, notification } from 'antd'

import {
  createProtocol,
  updateProtocol,
  deleteProtocol,
} from '../../../../services/protocolService'
import {
  PROTOCOLS_TAGS,
  PROTOCOLS_CONFIRM_MSG,
  PROTOCOL_ACTIONS,
} from '../../../../config/constants'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../../components/CommonComponent'
import ConfirmActionButton from '../../../../components/ConfirmActionButton'
import SelectCategory from './SelectCategory'
import { Root, Topbar } from './styles'

const { Option } = Select

const OrgProtocolsForm = (props) => {
  const { orgId } = props
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
      title: 'Builder',
    },
  ]

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { type } = useParams()
  const location = useLocation()
  const data = location?.state
  const id = data?.protocol_id

  const [initial, setInitial] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const onSelectTags = (value) => {
    console.log(`selected ${value}`)
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteProtocol(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({
          message: `A draft has been deleted successfully!`,
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

  const onFinish = (values) => {
    console.log(values)
    const payload = {
      organization_id: orgId,
      parent_id: null,
      protocol_name: values.protocol_name,
      protocol_number: values.protocol_number,
      category_id: values.category_id,
      tags: values.tags,
      status: type === 'new' ? PROTOCOL_ACTIONS.DRAFT : PROTOCOL_ACTIONS.INREVIEW,
    }

    setIsLoading(true)

    if (type === 'new') {
      createProtocol(payload)
        .then((res) => {
          setIsLoading(false)
          notification.success({ message: 'A new protocol has been created successfully!' })

          const resData = res?.data || {}
          navigate('/organizations/protocols/review', { state: { orgId, ...resData } })
        })
        .catch((error) => {
          setIsLoading(false)

          notification.error({
            message: 'Add Failure',
            description: error?.data || '',
          })
        })
    } else {
      updateProtocol(id, payload)
        .then((res) => {
          setIsLoading(false)
          setInitial(values)
          notification.success({ message: 'A protocol has been updated successfully!' })

          const resData = res?.data || {}
          navigate('/organizations/protocols/review', { state: { orgId, ...resData } })
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

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
      </Topbar>
      <Root>
        <Form
          form={form}
          autoComplete="nope"
          initialValues={initial || data}
          layout="vertical"
          name="protocols"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="protocol_name"
            hasFeedback
            rules={[{ required: true, message: 'Please input Name' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Form.Item
              label="Number"
              name="protocol_number"
              className="number"
              hasFeedback
              rules={[{ required: true, message: 'Please input Number' }]}
            >
              <Input size="large" />
            </Form.Item>
            <SelectCategory orgId={orgId} />
            <Form.Item
              label="Tags"
              name="tags"
              className="tags"
              hasFeedback
              rules={[{ required: true, message: 'Please select tags' }]}
            >
              <Select
                mode="multiple"
                size="large"
                allowClear
                showSearch
                showArrow
                onChange={onSelectTags}
                optionLabelProp="label"
              >
                {PROTOCOLS_TAGS.map((tag, index) => (
                  <Option key={index} value={tag.id} label={tag.name}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <FormActionButtons>
            {type === 'edit' && id && (
              <ConfirmActionButton
                type="link"
                size="large"
                danger
                onClick={onDelete}
                loading={isDeleting}
                actionType={PROTOCOL_ACTIONS.DELETE}
                message={PROTOCOLS_CONFIRM_MSG.DELETE_DRAFT}
              >
                Delete
              </ConfirmActionButton>
            )}
            {type === 'new' && <div />}
            <Space>
              <Button size="large" htmlType="submit" loading={isLoading} disabled={isLoading}>
                Send to Review
              </Button>
              <Button size="large">
                <Link to={`/organizations/protocols/list`} state={{ orgId }}>
                  Close
                </Link>
              </Button>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default OrgProtocolsForm
