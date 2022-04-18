import React, { useState } from 'react'
import { Button, Popover, Menu, Typography, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import ContentModal from './ContentModal'
import { AddMenu } from './styles'

const { Text } = Typography

const ComponentsMenu = (props) => {
  const { orgId, list, disabledComponents, onSelect } = props

  const [visiblePopover, setVisiblePopover] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [selectedType, setSelectedType] = useState(null)

  const onChangeVisiblePopover = (visible) => {
    setVisiblePopover(visible)
  }

  const onChangeVisibleModal = (visible) => {
    if (!visible) setSelectedType(null)

    setVisibleModal(visible)
  }

  const onShowModal = (type) => () => {
    setSelectedType(type)
    onChangeVisiblePopover(false)
    onChangeVisibleModal(true)
  }

  const onSelectComponent = (component) => {
    onSelect && onSelect(component)
    notification.info({ message: 'A component has been added.' })
  }

  const menu = (
    <AddMenu>
      {list.map((type, index) => {
        return (
          <Menu.Item key={index} onClick={onShowModal(type.id)}>
            <Text>{type.name}</Text>
            <Text className="short-key">{type.shortKeyLabel}</Text>
          </Menu.Item>
        )
      })}
    </AddMenu>
  )

  return (
    <div>
      <Popover
        content={menu}
        placement="bottomLeft"
        trigger="click"
        overlayClassName="custom-popover no-padding-content"
        visible={visiblePopover}
        onVisibleChange={onChangeVisiblePopover}
      >
        <Button icon={<PlusOutlined />} size="small" />
      </Popover>
      <ContentModal
        orgId={orgId}
        componentType={selectedType}
        visible={visibleModal}
        disabledComponents={disabledComponents}
        onSelect={onSelectComponent}
        onCancel={() => onChangeVisibleModal(false)}
      />
    </div>
  )
}

export default ComponentsMenu
