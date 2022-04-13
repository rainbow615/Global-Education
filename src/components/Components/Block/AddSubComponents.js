import React, { useState } from 'react'
import { Button, Popover, Menu, Space, Tag, Tabs } from 'antd'
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
  const { type, components, currentKey, onSelect } = props

  const [searchText, setSearchText] = useState('')

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const onSelectItem = (e) => {
    onSelect(e.key, dataSource[e.key])
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
          <Menu onSelect={onSelectItem} selectedKeys={[currentKey]}>
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
  const { orgId, onSelect } = props

  const [selectedComponent, setSelectedComponent] = useState(null)
  const [currentKey, setCurrentKey] = useState(-1)

  const { data: components, error } = useComponents(orgId)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onTabChange = () => {
    setSelectedComponent(null)
    setCurrentKey(-1)
  }

  const onSelectItem = (key, component) => {
    setCurrentKey(key)
    setSelectedComponent(component)
  }

  const onAddComponent = () => {
    if (selectedComponent) {
      onSelect(selectedComponent)
      setSelectedComponent(null)
      setCurrentKey(-1)
    }
  }

  return (
    <ModalContentView>
      <ModalHeader>
        <Button type="primary">New</Button>
      </ModalHeader>
      <Tabs defaultActiveKey="1" type="card" size="small" onChange={onTabChange}>
        <TabPane tab="Text" key="1">
          <TabContent
            type={COMPONENTS_TYPES[1].id}
            components={components}
            onSelect={onSelectItem}
            currentKey={currentKey}
          />
        </TabPane>
        <TabPane tab="Medication" key="2">
          <TabContent
            type={COMPONENTS_TYPES[3].id}
            components={components}
            onSelect={onSelectItem}
            currentKey={currentKey}
          />
        </TabPane>
        <TabPane tab="Protocol Link" key="3">
          <TabContent
            type={COMPONENTS_TYPES[4].id}
            components={components}
            onSelect={onSelectItem}
            currentKey={currentKey}
          />
        </TabPane>
      </Tabs>

      <ModalFooter>
        <Button type="primary" disabled={!selectedComponent} onClick={onAddComponent}>
          Add
        </Button>
      </ModalFooter>
    </ModalContentView>
  )
}

const AddSubComponents = (props) => {
  const { orgId, onSelect } = props

  const [isVisible, setIsVisible] = useState(false)

  const onVisibleChange = (visible) => {
    setIsVisible(visible)
  }

  const onSelectItem = (component) => {
    setIsVisible(false)
    onSelect(component)
  }

  return (
    <Popover
      content={<SubComponentsModal orgId={orgId} onSelect={onSelectItem} />}
      placement="bottomLeft"
      trigger="click"
      visible={isVisible}
      onVisibleChange={onVisibleChange}
    >
      <Button icon={<PlusOutlined />} size="small" />
    </Popover>
  )
}

export default AddSubComponents
