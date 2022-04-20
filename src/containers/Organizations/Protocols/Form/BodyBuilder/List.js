import React, { useEffect, useState } from 'react'
import Nestable from 'react-nestable'
import { Button, Space, Tag } from 'antd'
import { HolderOutlined, DownOutlined, UpOutlined, DeleteOutlined } from '@ant-design/icons'

import { getFirstLetter } from '../../../../../utils'
import { ListSection, ListItem, HTMLViewer } from './styles'

const getHandleBar = () => <HolderOutlined style={{ fontSize: 22, cursor: 'pointer' }} />
const getCollapseIcon = ({ isCollapsed }) => {
  if (isCollapsed) return <DownOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
  else return <UpOutlined style={{ fontSize: 16, cursor: 'pointer' }} />
}

const items = [
  {
    id: 0,
    component_id: '0',
    component_content: 'Text component',
    component_type: 'text',
  },
  {
    id: 1,
    component_id: '1',
    component_content: 'Block component',
    component_type: 'block',
    accepts: ['medication', 'text', 'link'],
    children: [
      {
        id: 2,
        component_id: '2',
        component_content: 'Link component',
        component_type: 'link',
      },
    ],
  },
  {
    id: 3,
    component_id: '3',
    component_content: 'Section component',
    component_type: 'section',
    accepts: ['block', 'medication', 'text', 'link'],
    children: [
      {
        id: 4,
        component_id: '4',
        component_content: 'Medication component',
        component_type: 'medication',
      },
    ],
  },
]

const BodyList = (props) => {
  const { bodyData, onChange } = props

  const onRemove = (id) => (e) => {
    e.stopPropagation()
  }

  const getRemoveBar = (id) => (
    <Button
      icon={<DeleteOutlined style={{ fontSize: 20, cursor: 'pointer' }} />}
      className="remove-button"
      onClick={onRemove(id)}
    />
  )

  const renderItem = ({ item, collapseIcon, handler }) => {
    return (
      <ListItem>
        <Space>
          <Space className="remove-button-wrap">{getRemoveBar(item.component_id)}</Space>
          <Tag>{getFirstLetter(item.component_type)}</Tag>
          <HTMLViewer dangerouslySetInnerHTML={{ __html: item.component_content }} />
        </Space>
        <Space>
          {collapseIcon}
          {handler}
        </Space>
      </ListItem>
    )
  }

  const confirmChange = ({ dragItem, destinationParent }) => {
    // move to root level
    if (!destinationParent) return true

    return (destinationParent.accepts || []).indexOf(dragItem.component_type) > -1
  }

  return (
    <ListSection>
      <Nestable
        items={items}
        renderItem={renderItem}
        confirmChange={confirmChange}
        handler={getHandleBar()}
        renderCollapseIcon={getCollapseIcon}
      />
    </ListSection>
  )
}

export default BodyList
