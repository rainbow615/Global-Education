import React, { useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Select, Button, Space, message, notification } from 'antd'
import { debounce } from 'lodash'

import {
  createProtocol,
  updateProtocol,
  deleteProtocol,
} from '../../../../services/protocolService'
import {
  PROTOCOLS_CONFIRM_MSG,
  PROTOCOL_ACTIONS,
  AUTO_SAVE_DELAY,
} from '../../../../config/constants'
import { PROTOCOL_TAGS } from '../../../../config/tags'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../../components/CommonComponent'
import ConfirmActionButton from '../../../../components/ConfirmActionButton'
import SelectCategory from './SelectCategory'
import BodyBuilder from './BodyBuilder'
import { Root, Topbar } from './styles'

const { Option } = Select

const OrgProtocolsForm = (props) => {
  const { orgId, orgName } = props
  const navigate = useNavigate()
  const { type } = useParams()
  const location = useLocation()
  const data = location?.state
  const title = data?.protocol_name || ''

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: `${orgName} Protocols`,
      link: '/organizations/protocols/list',
      state: { orgId, orgName },
    },
    {
      title: type === 'edit' ? `${title} Draft` : 'Builder',
    },
  ]

  const [form] = Form.useForm()

  const [initial, setInitial] = useState()
  const [id, setId] = useState(data?.protocol_id || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDisableAutoLoad, setIsDisableAutoLoad] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onDelete = () => {
    setIsDeleting(true)

    deleteProtocol(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({
          message: `Protocol draft has been deleted successfully!`,
        })
        navigate('/organizations/protocols/list', { state: { orgId, orgName } })
      })
      .catch((error) => {
        setIsDeleting(false)

        notification.error({
          message: 'Delete failed!',
          description: error?.data || '',
        })
      })
  }

  const onFinish = (values) => {
    const payload = {
      organization_id: orgId,
      parent_id: data?.parent_id || null,
      protocol_name: values.protocol_name,
      protocol_number: values.protocol_number,
      category_id: values.category_id,
      tags: values.tags.sort(),
      status: PROTOCOL_ACTIONS.INREVIEW,
    }

    setIsLoading(true)

    updateProtocol(id, payload)
      .then((res) => {
        setIsLoading(false)
        setInitial(values)
        notification.success({ message: 'Protocol has been updated successfully!' })

        const resData = res?.data || {}
        navigate('/organizations/protocols/review', { state: { orgId, orgName, ...resData } })
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Update failed!',
          description: error?.data || '',
        })
      })
  }

  const onFinishFailed = () => {}

  const onChangeValues = () => {
    const { category_id, protocol_name, protocol_number, tags } = form.getFieldsValue(true)

    if (tags && tags.length > 0) {
      setInitial({ ...form.getFieldsValue(true), tags: tags.sort() })
    }

    if (category_id && protocol_name && protocol_number && tags && tags.length > 0) {
      const payload = {
        organization_id: orgId,
        parent_id: data?.parent_id || null,
        protocol_name,
        protocol_number,
        category_id,
        tags: tags.sort(),
        status: PROTOCOL_ACTIONS.DRAFT,
      }

      const hide = message.loading('Saving...', 0)

      if (!id) {
        setIsDisableAutoLoad(true)

        createProtocol(payload)
          .then((res) => {
            setIsDisableAutoLoad(false)
            setTimeout(hide, 0)
            setErrorMsg('')

            if (res?.data?.protocol_id) setId(res.data.protocol_id)
          })
          .catch((error) => {
            setIsDisableAutoLoad(false)
            setTimeout(hide, 0)

            if (error?.status === 500) {
              setErrorMsg(error?.data || '')
            }
          })
      } else {
        updateProtocol(id, payload)
          .then(() => {
            setTimeout(hide, 0)
            setErrorMsg('')
          })
          .catch((error) => {
            setTimeout(hide, 0)

            if (error?.status === 500) {
              setErrorMsg(error?.data || '')
            }
          })
      }
    }
  }

  const debouncedChangeHandler = debounce(onChangeValues, AUTO_SAVE_DELAY)

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
            rules={[{ required: true, message: 'Please input a name.' }]}
            validateStatus={errorMsg ? 'error' : undefined}
            help={errorMsg}
          >
            <Input size="large" onChange={() => debouncedChangeHandler()} />
          </Form.Item>
          <Form.Item>
            <Form.Item
              label="Number"
              name="protocol_number"
              className="number"
              hasFeedback
              rules={[{ required: true, message: 'Please input a number.' }]}
            >
              <Input size="large" onChange={() => debouncedChangeHandler()} />
            </Form.Item>
            <SelectCategory orgId={orgId} onChange={() => debouncedChangeHandler()} />
            <Form.Item
              label="Tags"
              name="tags"
              className="tags"
              hasFeedback
              rules={[{ required: true, message: 'Please select 1 or more tag.' }]}
            >
              <Select
                mode="multiple"
                size="large"
                allowClear
                showSearch
                showArrow
                onChange={() => debouncedChangeHandler()}
                optionLabelProp="label"
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                {PROTOCOL_TAGS.map((tag, index) => (
                  <Option key={index} value={tag} label={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <BodyBuilder />
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
              <Button
                size="large"
                htmlType="submit"
                loading={isLoading}
                disabled={!id || isDisableAutoLoad || isLoading || errorMsg}
              >
                Send to Review
              </Button>
              <Button size="large">
                <Link to={`/organizations/protocols/list`} state={{ orgId, orgName }}>
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
