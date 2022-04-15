import React from 'react'
import { Button, Space, Tag } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'
import { HolderOutlined, DeleteOutlined } from '@ant-design/icons'

import { getFirstLetter } from '../../../utils'
import { ComponentsListView, SubComponentRow, HTMLViewer } from './styles'

const getHandleBar = () => <HolderOutlined style={{ fontSize: 22, cursor: 'pointer' }} />

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'lightgray' : 'white',
  margin: `0 0 10px 0`,

  // styles we need to apply on draggables
  ...draggableStyle,
})

const SubComponentList = (props) => {
  const { list, onChange } = props

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(list, result.source.index, result.destination.index)

    onChange(items)
  }

  const onRemove = (id) => () => {
    const index = _.findIndex(list, { component_id: id })
    const items = [...list]
    items.splice(index, 1)

    onChange(items)
  }

  const getRemoveBar = (id) => (
    <Button
      icon={<DeleteOutlined style={{ fontSize: 20, cursor: 'pointer' }} />}
      className="remove-button"
      onClick={onRemove(id)}
    />
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ComponentsListView {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable key={item.component_id} draggableId={item.component_id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    <SubComponentRow>
                      <Space className="remove-button-wrap">
                        {getRemoveBar(item.component_id)}
                      </Space>
                      <Space>
                        <Tag>{getFirstLetter(item.component_type)}</Tag>
                        <HTMLViewer dangerouslySetInnerHTML={{ __html: item.component_content }} />
                      </Space>
                      <Space align="center">{getHandleBar()}</Space>
                    </SubComponentRow>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ComponentsListView>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SubComponentList
