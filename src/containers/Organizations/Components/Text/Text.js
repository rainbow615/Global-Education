import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Select, Row, Col } from 'antd'

import CustomCkEditor from '../../../../components/CustomCkEditor/CustomCkEditor'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentForm from '../../../../components/Components/Form'
import { Root } from './styles'

const { Option } = Select
const Tags = []

const ComponentTextForm = (props) => {
  const { orgId, orgName } = props
  const { type } = useParams()

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: `${orgName}`,
    },
    {
      title: `Components`,
      link: '/organizations/components/list',
      state: { orgId, orgName },
    },
    {
      title: type === 'edit' ? 'Edit Text' : 'Add Text',
    },
  ]

  const [initial] = useState({})

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <ComponentForm initialValues={initial}>
          <Form.Item label="Content" name="content">
            <CustomCkEditor simpleMode data={''} placeholder="Enter text" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Tags"
                name="tags"
                hasFeedback
                rules={[{ required: true, message: 'Please select 1 or more tag.' }]}
              >
                <Select
                  mode="multiple"
                  size="large"
                  allowClear
                  showSearch
                  showArrow
                  optionLabelProp="label"
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {Tags.map((tag, index) => (
                    <Option key={index} value={tag.id} label={tag.name}>
                      {tag.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </ComponentForm>
      </Root>
    </React.Fragment>
  )
}

export default ComponentTextForm
