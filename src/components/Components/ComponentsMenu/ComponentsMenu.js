import { PlusOutlined } from '@ant-design/icons'
import { Button, Menu, notification, Popover, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import ContentModal from './ContentModal'
import { AddMenu } from './styles'

const { Text } = Typography

const ComponentsMenu = (props) => {
  const { orgId, list, disabledComponents, onSelect } = props

  const [visiblePopover, setVisiblePopover] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [modifier, setModifier] = useState('')

  useEffect(() => {
    if (navigator.oscpu === 'Mac OS') {
      setModifier('cmd')
    } else {
      setModifier('ctrl')
    }
  }, [setModifier])

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

  useHotkeys(modifier + '+m', (e) => {
    e.preventDefault()
    onShowModal('medication')()
  })

  useHotkeys(modifier + '+s', (e) => {
    e.preventDefault()
    onShowModal('section')()
  })

  useHotkeys(modifier + '+t', (e) => {
    e.preventDefault()
    onShowModal('text')()
  })

  useHotkeys(modifier + '+l', (e) => {
    e.preventDefault()
    onShowModal('link')()
  })

  useHotkeys(modifier + '+b', (e) => {
    e.preventDefault()
    onShowModal('block')()
  })

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
