import React, { useState } from 'react'
import { Button, Menu, Space, Tag, Input } from 'antd'
import { map, get } from 'lodash'

import { useComponents } from '../../../services/componentService'
import { regExpEscape, getFirstLetter } from '../../../utils'
import { COMPONENT_FORM_ROLE } from '../../../config/constants'
import CustomLoading from '../../Loading/Loading'
import { ResultFailed } from '../../ResultPages'
import ComponentMedication from '../Medication'
import ComponentLink from '../Link'
import ComponentText from '../Text'
import ComponentBlock from '../Block'
import ComponentSection from '../Section'
import { ModalContainer, ModalHeader, ScrollView, HTMLViewer, EmptyText } from './styles'

const { Search } = Input

const ContentModal = (props) => {
  const { orgId, visible, componentType, onCancel, onSelect } = props

  const [searchText, setSearchText] = useState('')
  const [isShowNewForm, setIsShowNewForm] = useState(false)

  const { data: components, error, mutate } = useComponents(orgId)

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

  const onOpenNewForm = () => {
    setIsShowNewForm(true)
  }

  const onSuccessSubmit = () => {
    setIsShowNewForm(false)
    mutate()
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
      {!isShowNewForm && (
        <div>
          <ModalHeader>
            <Button type="primary" onClick={onOpenNewForm}>
              Add New
            </Button>
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
              <Menu onSelect={onSelectItem} selectedKeys="-1">
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
        </div>
      )}
      {isShowNewForm && (
        <React.Fragment>
          {componentType === 'medication' && (
            <ComponentMedication
              orgId={orgId}
              isNew
              role={COMPONENT_FORM_ROLE.ONLY_CREATE}
              onSuccessSubmit={onSuccessSubmit}
            />
          )}
          {componentType === 'link' && (
            <ComponentLink
              orgId={orgId}
              isNew
              role={COMPONENT_FORM_ROLE.ONLY_CREATE}
              onSuccessSubmit={onSuccessSubmit}
            />
          )}
          {componentType === 'text' && (
            <ComponentText
              orgId={orgId}
              isNew
              role={COMPONENT_FORM_ROLE.ONLY_CREATE}
              onSuccessSubmit={onSuccessSubmit}
            />
          )}
          {componentType === 'section' && (
            <ComponentSection
              orgId={orgId}
              isNew
              role={COMPONENT_FORM_ROLE.ONLY_CREATE}
              onSuccessSubmit={onSuccessSubmit}
            />
          )}
          {componentType === 'block' && (
            <ComponentBlock
              orgId={orgId}
              isNew
              role={COMPONENT_FORM_ROLE.ONLY_CREATE}
              onSuccessSubmit={onSuccessSubmit}
            />
          )}
        </React.Fragment>
      )}
    </ModalContainer>
  )
}

export default ContentModal
