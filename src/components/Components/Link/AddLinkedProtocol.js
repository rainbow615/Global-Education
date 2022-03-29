import React, { useState } from 'react'
import { Button, Popover, Menu, Space, Typography } from 'antd'
import { debounce, map, get } from 'lodash'
import { PlusOutlined } from '@ant-design/icons'

import { useProtocols } from '../../../services/protocolService'
import { SEARCH_DELAY } from '../../../config/constants'
import { CustomSearchText } from '../../CommonComponent'
import CustomLoading from '../../Loading/Loading'
import { ResultFailed } from '../../ResultPages'
import { regExpEscape } from '../../../utils'
import { dynamicSortMultiple } from '../../../utils/sort'
import { ModalContentView, ScrollView } from './styles'

const { Text } = Typography

const ProtocolsModal = (props) => {
  const { orgId, onSelect } = props
  const [searchText, setSearchText] = useState('')

  const { data: protocols, error } = useProtocols(orgId)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onClickItem = (protocol) => () => {
    onSelect(protocol)
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const filteredProtocols = protocols?.data
    ? map(protocols.data, (record, index) => {
        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const nameMatch = get(record, 'protocol_name').match(reg)
          const numberMatch = get(record, 'protocol_number').match(reg)
          if (!numberMatch && !nameMatch) {
            return null
          }
        }

        return record
      }).filter((record) => !!record)
    : []

  return (
    <ModalContentView>
      <CustomSearchText
        placeholder="Search"
        enterButton
        allowClear
        onChange={debouncedSearchHandler}
        onPressEnter={debouncedSearchHandler}
      />
      <ScrollView>
        {!protocols.isLoading && (
          <Menu>
            {filteredProtocols
              .sort(dynamicSortMultiple(['protocol_number', 'protocol_name']))
              .map((obj, index) => (
                <Menu.Item key={index} onClick={onClickItem(obj)}>
                  <Space>
                    <Text>{get(obj, 'protocol_number')}</Text>
                    <Text>{get(obj, 'protocol_name')}</Text>
                  </Space>
                </Menu.Item>
              ))}
          </Menu>
        )}
        {protocols.isLoading && <CustomLoading />}
      </ScrollView>
    </ModalContentView>
  )
}

const AddLinkedProtocol = (props) => {
  const { orgId, onSelect } = props

  return (
    <Popover
      content={<ProtocolsModal orgId={orgId} onSelect={onSelect} />}
      placement="bottomLeft"
      trigger="click"
    >
      <Button icon={<PlusOutlined />} size="small" />
    </Popover>
  )
}

export default AddLinkedProtocol
