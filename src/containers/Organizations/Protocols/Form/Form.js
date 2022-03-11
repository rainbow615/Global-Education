import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Space, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import {
  PROTOCOLS_TAGS,
  PROTOCOLS_CONFIRM_MSG,
  PROTOCOL_STATUS,
} from '../../../../config/constants'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../../components/CommonComponent'
import ConfirmActionButton from '../../../../components/ConfirmActionButton'
import { Root, Topbar, AddNewTeamButton } from './styles'

const { Option } = Select

const categories = [
  {
    id: '123',
    name: '100 - Treatment protocols',
  },
]

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

  const onSelectCategory = (value) => {
    console.log(`selected ${value}`)
  }

  const onOpenAddNewCategory = () => {}

  const onSelectTags = (value) => {
    console.log(`selected ${value}`)
  }

  const onDelete = () => {}

  const onFinish = (values) => {}

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
          initialValues={{}}
          layout="vertical"
          name="organizations"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            hasFeedback
            rules={[{ required: true, message: 'Please input Name' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Form.Item
              label="Number"
              name="number"
              className="number"
              hasFeedback
              rules={[{ required: true, message: 'Please input Number' }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              className="category"
              hasFeedback
              rules={[{ required: true, message: 'Please select Type' }]}
            >
              <Select
                size="large"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={onSelectCategory}
              >
                {categories.map((cat, index) => (
                  <Option key={index} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
                <Option key="action" disabled>
                  <AddNewTeamButton icon={<PlusOutlined />} onClick={onOpenAddNewCategory}>
                    Add new
                  </AddNewTeamButton>
                </Option>
              </Select>
            </Form.Item>
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
            <Space>
              <Button size="large" htmlType="submit" loading={false} disabled={false}>
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
