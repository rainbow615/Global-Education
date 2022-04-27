import React, { useEffect, useState } from 'react'
import Nestable from 'react-nestable'
import { Button, Empty, Space, Tag, Typography } from 'antd'
import { HolderOutlined, DownOutlined, UpOutlined, DeleteOutlined } from '@ant-design/icons'

import { getFirstLetter, removeItemNested } from '../../../../../utils'
import { ListSection, ListItem, HTMLViewer } from './styles'

const getHandleBar = () => (
  <HolderOutlined style={{ fontSize: 22, cursor: 'grab', marginRight: 2, marginTop: 2 }} />
)
const getCollapseIcon = ({ isCollapsed }) => {
  if (isCollapsed) return <DownOutlined style={{ fontSize: 16, cursor: 'grab' }} />
  else return <UpOutlined style={{ fontSize: 16, cursor: 'grab' }} />
}

const BodyList = (props) => {
  const { bodyData, onChange } = props

  const [list, setList] = useState([])

  useEffect(() => {
    setList(bodyData)
  }, [bodyData])

  const onRemove = (id) => (e) => {
    const newList = removeItemNested(list, id, 'id', 'children')

    setList(newList)
    onChange(newList)
  }

  const onChangeList = ({ items }) => {
    onChange(items)
  }

  const getRemoveBar = (id) => (
    <Button
      icon={<DeleteOutlined style={{ fontSize: 16, cursor: 'pointer' }} />}
      className="remove-button"
      onClick={onRemove(id)}
    />
  )

  const renderItem = ({ item, collapseIcon, handler }) => {
    return (
      <ListItem>
        <Space style={{ gap: 5 }}>
          <Space className="remove-button-wrap">{getRemoveBar(item.id)}</Space>
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
      {console.log(list.length)}
      {list?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {list?.length > 0 && (
        <Nestable
          items={list}
          renderItem={renderItem}
          confirmChange={confirmChange}
          handler={getHandleBar()}
          renderCollapseIcon={getCollapseIcon}
          onChange={onChangeList}
        />
      )}
    </ListSection>
  )
}

export default BodyList
