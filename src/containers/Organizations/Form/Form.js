import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Form, Input, Select, List, Button, Space } from 'antd'
import _ from 'lodash'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import { Types } from '../../../config/constants'
import States from '../../../config/states.json'
import { Root, RegionsCard } from './styles'

const { Option } = Select

const OrganizationsForm = () => {
  const location = useLocation()
  const { type } = useParams()
  const breadCrumb = [
    {
      title: 'Organizations',
    },
    {
      title: type === 'new' ? 'Add' : 'Edit',
    },
  ]

  const [selectedRegions, setSelectedRegions] = useState([])

  const onSelectRegions = (value) => {
    const isCheck = _.findIndex(selectedRegions, { abbreviation: value })

    if (isCheck === -1) {
      const newState = _.findIndex(States, { abbreviation: value })
      setSelectedRegions([...selectedRegions, States[newState]])
    }
  }

  const onRemoveRegions = (abbreviation) => () => {
    const isSearch = _.findIndex(selectedRegions, { abbreviation: abbreviation })
    const newRegion = [...selectedRegions]
    newRegion.splice(isSearch, 1)
    setSelectedRegions(newRegion)
  }

  const onFinish = () => {}

  const onFinishFailed = () => {}

  console.log('initial value', location.state)

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          autoComplete="off"
          initialValues={location.state || {}}
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
                {Types.map((type) => (
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
              <Input placeholder="Region *" size="large" />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              className="state"
              rules={[{ required: true, message: 'Please select State' }]}
            >
              <Select placeholder="State" size="large" allowClear>
                {States.map((state, index) => (
                  <Option key={index} value={state.abbreviation}>
                    {state.abbreviation}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>

          <FormActionButtons>
            <Button type="link" size="large" danger>
              Delete
            </Button>
            <Space>
              <Button size="large" htmlType="submit">
                Add
              </Button>
              <Button size="large" disabled={true}>
                Publish
              </Button>
            </Space>
          </FormActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default OrganizationsForm
