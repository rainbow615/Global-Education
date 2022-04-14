import React, { useState } from 'react'
import { Button, Menu, Space, Tag, Input } from 'antd'
import { map, get } from 'lodash'

import { useComponents } from '../../../services/componentService'
import { regExpEscape, getFirstLetter } from '../../../utils'
import CustomLoading from '../../Loading/Loading'
import { ResultFailed } from '../../ResultPages'
import { ModalContainer, ModalHeader, ScrollView, HTMLViewer, EmptyText } from './styles'

const { Search } = Input

const ContentModal = (props) => {
  const { orgId, visible, componentType, onCancel, onSelect } = props

  const [searchText, setSearchText] = useState('')

  const { data: components, error } = useComponents(orgId)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const onSelectItem = (e) => {
    setSearchText('')
    onSelect(dataSource[e.key])
  }

  const dataSource = components?.data
    ? map(components.data, (record) => {
        const type = get(record, 'component_type')

        if (componentType !== type) {
          return null
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const typeMatch = type.match(reg)
          const contentMatch = get(record, 'component_content').match(reg)

          if (!typeMatch && !contentMatch) {
            return null
          }
        }

        return record
      }).filter((record) => !!record)
    : []

  return (
    <ModalContainer width="70%" visible={visible} footer={null} onCancel={onCancel}>
      <ModalHeader>
        <Button type="primary">Add New</Button>
      </ModalHeader>
      <Search
        value={searchText}
        placeholder="Search"
        enterButton
        allowClear
        onChange={onSearch}
        onPressEnter={onSearch}
      />
      <ScrollView>
        {!components.isLoading && (
          <Menu onSelect={onSelectItem}>
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
    </ModalContainer>
  )
}

export default ContentModal
