import React from 'react'
import { Button, Menu, Space, Typography, Popover } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { NEW_COMPONENTS_MENU } from '../../../../../config/constants'
import BodyList from './List'
import { Root, BodyMenu } from './styles'

const { Text } = Typography

const BodyBuilder = () => {
  const menu = (
    <BodyMenu>
      {NEW_COMPONENTS_MENU.map((type, index) => (
        <Menu.Item key={index}>
          <Text>{type.name}</Text>
          <Text className="short-key">{type.shortKeyLabel}</Text>
        </Menu.Item>
      ))}
    </BodyMenu>
  )

  return (
    <Root size="middle" direction="vertical">
      <Space>
        <Text>{`Body `}</Text>
        <Popover
          content={menu}
          placement="bottomLeft"
          trigger="click"
          overlayClassName="custom-popover no-padding-content"
        >
          <Button icon={<PlusOutlined />} size="small" />
        </Popover>
      </Space>
      <BodyList />
    </Root>
  )
}

export default BodyBuilder
