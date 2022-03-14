import React, { useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Select, Button, Space, notification } from 'antd'

import { createProtocol, updateProtocol } from '../../../../services/protocolService'
import {
  PROTOCOLS_TAGS,
  PROTOCOLS_CONFIRM_MSG,
  PROTOCOL_STATUS,
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

  const onSelectTags = (value) => {
    console.log(`selected ${value}`)
  }

  const onDelete = () => {}

  const onFinish = (values) => {
    console.log(values)
    const payload = {
      organization_id: orgId,
      parent_id: null,
      protocol_name: values.protocol_name,
      protocol_number: values.protocol_number,
      category_id: values.category_id,
      tags: values.tags,
      status: PROTOCOL_STATUS.DRAFT,
    }

    setIsLoading(true)

    if (type === 'new') {
      createProtocol(payload)
        .then((res) => {
          setIsLoading(false)
          notification.success({ message: 'A new protocol has been created successfully!' })
          navigate('/organizations/protocols/list', { state: { orgId } })
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
        .then(() => {
          setIsLoading(false)
          setInitial(values)
          notification.success({ message: 'A protocol has been updated successfully!' })
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
            {type === 'edit' && (
              <ConfirmActionButton
                type="link"
                size="large"
                danger
                onClick={onDelete}
                loading={false}
                actionType={PROTOCOL_STATUS.DELETE}
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
