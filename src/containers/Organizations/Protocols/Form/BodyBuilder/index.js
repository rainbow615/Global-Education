import React, { useState } from 'react'
import { Space, Typography } from 'antd'

import { NEW_COMPONENTS_MENU } from '../../../../../config/constants'
import ComponentsMenu from '../../../../../components/Components/ComponentsMenu'
import BodyList from './List'
import { Root } from './styles'

const { Text } = Typography

const BodyBuilder = (props) => {
  const { orgId } = props

  const [selectedComponents, setSelectedComponents] = useState([])

  const onAddComponent = (component) => {
    const newList = [...selectedComponents, component]
    setSelectedComponents(newList)
  }

  return (
    <Root size="middle" direction="vertical">
      <Space>
        <Text>{`Body `}</Text>
        <ComponentsMenu
          orgId={orgId}
          list={NEW_COMPONENTS_MENU}
          onSelect={onAddComponent}
          disabledComponents={selectedComponents}
        />
      </Space>
      <BodyList />
    </Root>
  )
}

export default BodyBuilder
