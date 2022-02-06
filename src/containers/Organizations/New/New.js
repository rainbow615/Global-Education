import React, { useState } from 'react'
import { Form, Input, Select, List, Button, Space } from 'antd'
import _ from 'lodash'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Types } from '../../../config/constants'
import States from '../../../config/states.json'
import { Root, RegionsCard, ActionButtons } from './styles'

const { Option } = Select

const breadCrumb = [
  {
    title: 'Organizations',
  },
  {
    title: 'Add',
  },
]

const OrganizationsAdd = () => {
  const [selectedRegions, setSelectedRegions] = useState([])

  const onSelectRegions = (value) => {
    const isCheck = _.findIndex(selectedRegions, { abbreviation: value })

    if (isCheck === -1) {
      const newState = _.findIndex(States, { abbreviation: value })
      setSelectedRegions([...selectedRegions, States[newState]])
    }
  }

  const onFinish = () => {}

  const onFinishFailed = () => {}

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          autoComplete="off"
          initialValues={{}}
          layout="vertical"
          name="contacts"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            hasFeedback
            rules={[{ required: true, message: 'Please input your name' }]}
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
                onChange={onSelectRegions}
              >
                {States.map((state) => (
                  <Option key={state.abbreviation} value={state.abbreviation}>
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
                      <Button type="link" danger>
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
              <Button size="large">Add</Button>
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

export default OrganizationsAdd
