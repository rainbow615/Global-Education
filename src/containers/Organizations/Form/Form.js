import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Form, Input, Select, List, Button, Space } from 'antd'
import _ from 'lodash'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Types } from '../../../config/constants'
import States from '../../../config/states.json'
import { Root, RegionsCard, ActionButtons } from './styles'

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
    const newRegions = [...selectedRegions]
    newRegions.splice(isSearch, 1)
    setSelectedRegions(newRegions)
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
          name="contacts"
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
              label="Regions"
              name="regions"
              className="regions"
              rules={[{ required: true, message: 'Please select Regions' }]}
            >
              <Select
                placeholder="Regions"
                size="large"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={onSelectRegions}
              >
                {States.map((state, index) => (
                  <Option key={index} value={state.abbreviation}>
                    {state.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <RegionsCard>
              <List
                dataSource={selectedRegions}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button type="link" danger onClick={onRemoveRegions(item.abbreviation)}>
                        Remove
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta title={item.name} />
                  </List.Item>
                )}
              />
            </RegionsCard>
          </Form.Item>
          <ActionButtons>
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
          </ActionButtons>
        </Form>
      </Root>
    </React.Fragment>
  )
}

export default OrganizationsForm
