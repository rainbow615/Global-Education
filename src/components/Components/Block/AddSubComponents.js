import React, { useState } from 'react'
import { Button, Popover, Menu, Space, Tag, Tabs, Typography } from 'antd'
import { debounce, map, get } from 'lodash'
import { PlusOutlined } from '@ant-design/icons'

import { useComponents } from '../../../services/componentService'
import { regExpEscape, getFirstLetter } from '../../../utils'
import { COMPONENTS_TYPES, SEARCH_DELAY } from '../../../config/constants'
import { CustomSearchText } from '../../CommonComponent'
import CustomLoading from '../../Loading/Loading'
import { ResultFailed } from '../../ResultPages'
import {
  ModalContentView,
  ScrollView,
  ModalHeader,
  ModalFooter,
  HTMLViewer,
  EmptyText,
} from './styles'

const { TabPane } = Tabs

const TabContent = (props) => {
  const { type, components } = props
  const [searchText, setSearchText] = useState('')

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = components?.data
    ? map(components.data, (record) => {
        const componentType = get(record, 'component_type')

        if (type !== componentType) {
          return null
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const typeMatch = componentType.match(reg)
          const contentMatch = get(record, 'component_content').match(reg)

          if (!typeMatch && !contentMatch) {
            return null
          }
        }

        return record
      }).filter((record) => !!record)
    : []

  return (
    <React.Fragment>
      <CustomSearchText
        defaultValue={searchText}
        placeholder="Search"
        enterButton
        allowClear
        onChange={debouncedSearchHandler}
        onPressEnter={debouncedSearchHandler}
      />
      <ScrollView>
        {!components.isLoading && (
          <Menu>
            {dataSource.map((item, index) => (
              <Menu.Item key={index}>
                <Space>
                  <Tag>{getFirstLetter(item.component_type)}</Tag>
                  <HTMLViewer
                    dangerouslySetInnerHTML={{ __html: item.component_content }}
                    className="popup-item"
                  />
                </Space>
              </Menu.Item>
            ))}
            {dataSource.length === 0 && (
              <Menu.Item key="empty">
                <EmptyText>No Data</EmptyText>
              </Menu.Item>
            )}
          </Menu>
        )}
        {components.isLoading && <CustomLoading />}
      </ScrollView>
    </React.Fragment>
  )
}

const SubComponentsModal = (props) => {
  const { orgId } = props

  const { data: components, error } = useComponents(orgId)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  return (
    <ModalContentView>
      <ModalHeader>
        <Button type="primary">New</Button>
      </ModalHeader>
      <Tabs defaultActiveKey="1" type="card" size="small">
        <TabPane tab="Text" key="1">
          <TabContent type={COMPONENTS_TYPES[1].id} components={components} />
        </TabPane>
        <TabPane tab="Medication" key="2">
          <TabContent type={COMPONENTS_TYPES[3].id} components={components} />
        </TabPane>
        <TabPane tab="Protocol Link" key="3">
          <TabContent type={COMPONENTS_TYPES[4].id} components={components} />
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
