import React, { useState } from 'react'
import { Form, Select, Row, Col } from 'antd'

import CustomCkEditor from '../../CustomCkEditor/CustomCkEditor'
import ComponentForm from '../../Components/Form'

const { Option } = Select
const Tags = []

const ComponentText = () => {
  const [initial] = useState({})

  return (
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
  )
}

export default ComponentText
