import React, { useState } from 'react'
import { Button, Popover, Menu, Space, Typography, Tag, Tabs } from 'antd'
import { debounce, map, get } from 'lodash'
import { PlusOutlined } from '@ant-design/icons'

import { SEARCH_DELAY } from '../../../../config/constants'
import { CustomSearchText } from '../../../../components/CommonComponent'
import { ModalContentView, ScrollView, ModalHeader, ModalFooter } from './styles'

const { Text } = Typography
const { TabPane } = Tabs

const SubComponentsModal = (props) => {
  const { orgId } = props
  const [searchText, setSearchText] = useState('')

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const getTabContent = () => {
    return (
      <React.Fragment>
        <CustomSearchText
          placeholder="Search"
          enterButton
          allowClear
          onChange={debouncedSearchHandler}
          onPressEnter={debouncedSearchHandler}
        />
        <ScrollView>
          <Menu>
            <Menu.Item key="1">
              <Space>
                <Tag>T</Tag>
                <Text>Cool text component</Text>
              </Space>
            </Menu.Item>
            <Menu.Item key="2">
              <Space>
                <Tag>T</Tag>
                <Text>Etc, Etc....</Text>
              </Space>
            </Menu.Item>
          </Menu>
        </ScrollView>
      </React.Fragment>
    )
  }

  return (
    <ModalContentView>
      <ModalHeader>
        <Button type="primary">New</Button>
      </ModalHeader>
      <Tabs defaultActiveKey="1" type="card" size="small">
        <TabPane tab="Text" key="1">
          {getTabContent()}
        </TabPane>
        <TabPane tab="Medication" key="2">
          {getTabContent()}
        </TabPane>
        <TabPane tab="Protocol Link" key="3">
          {getTabContent()}
        </TabPane>
      </Tabs>

      <ModalFooter>
        <Button type="primary">Add</Button>
      </ModalFooter>
    </ModalContentView>
  )
}

const AddSubComponents = (props) => {
  const { orgId, onSelect } = props

  return (
    <Popover
      content={<SubComponentsModal orgId={orgId} onSelect={onSelect} />}
      placement="bottomLeft"
      trigger="click"
    >
      <Button icon={<PlusOutlined />} size="small" />
    </Popover>
  )
}

export default AddSubComponents
