import React from 'react'
import { Space, Typography } from 'antd'

import { NEW_COMPONENTS_MENU, COMPONENTS_TYPES } from '../../../../../config/constants'
import ComponentsMenu from '../../../../../components/Components/ComponentsMenu'
import BodyList from './List'
import { Root } from './styles'

const { Text } = Typography

const BodyBuilder = (props) => {
  const { orgId, components, onUpdate } = props

  const onAddComponent = (component) => {
    const updatedComponent = {
      id: component?.component_id,
      ...component,
    }

    if (component.component_type === COMPONENTS_TYPES[0].id) {
      updatedComponent.accepts = [
        COMPONENTS_TYPES[1].id,
        COMPONENTS_TYPES[2].id,
        COMPONENTS_TYPES[3].id,
        COMPONENTS_TYPES[4].id,
      ]
      updatedComponent.children = []
    }

    if (component.component_type === COMPONENTS_TYPES[2].id) {
      updatedComponent.accepts = [
        COMPONENTS_TYPES[1].id,
        COMPONENTS_TYPES[3].id,
        COMPONENTS_TYPES[4].id,
      ]
      updatedComponent.children = []
    }

    const newList = [...components, updatedComponent]
    onUpdate(newList)
  }

  const onChangeComponents = (components) => {
    onUpdate(components)
  }

  return (
    <Root size="middle" direction="vertical">
      <Space>
        <Text>{`Body `}</Text>
        <ComponentsMenu
          orgId={orgId}
          list={NEW_COMPONENTS_MENU}
          onSelect={onAddComponent}
          disabledComponents={components}
        />
      </Space>
      <BodyList bodyData={components} onChange={onChangeComponents} />
    </Root>
  )
}

export default BodyBuilder
