import React, { useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, Collapse, Space, Tag } from 'antd'
import { HolderOutlined, DeleteOutlined } from '@ant-design/icons'

import { getFirstLetter } from '../../../../../utils'
import { ListSection, PanelHeader } from './styles'

const { Panel } = Collapse

const bodyData = [
  {
    component_id: '1',
    component_type: 'text',
    component_content: 'BLS',
  },
  {
    component_id: '2',
    component_type: 'section',
    component_content: 'ALS',
  },
  {
    component_id: '3',
    component_type: 'block',
    component_content: 'IV SOIV SOIV SOIV SOIV SOIV SO',
  },
]

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

const BodyList = () => {
  const [list, setList] = useState(bodyData)

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(list, result.source.index, result.destination.index)

    setList(items)
  }

  const onRemove = (id) => (e) => {
    e.stopPropagation()

    const index = _.findIndex(list, { component_id: id })
    const items = [...list]
    items.splice(index, 1)

    setList(items)
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
          <ListSection
            className="custom-collapse"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((item, index) => (
              <Draggable key={item.component_id} draggableId={item.component_id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    <Collapse expandIconPosition="right">
                      <Panel
                        header={
                          <PanelHeader>
                            <Space className="remove-button-wrap">
                              {getRemoveBar(item.component_id)}
                            </Space>
                            <Tag>{getFirstLetter(item.component_type)}</Tag>
                            {item.component_content}
                          </PanelHeader>
                        }
                        key="1"
                        extra={getHandleBar()}
                      >
                        <Collapse expandIconPosition="right">
                          <Panel
                            header={<PanelHeader>Monitor / EKG</PanelHeader>}
                            key="3"
                            extra={getHandleBar()}
                            showArrow={false}
                            collapsible="disabled"
                          />
                        </Collapse>
                        <Collapse expandIconPosition="right">
                          <Panel
                            header={
                              <PanelHeader>
                                Ant Design, a design language for background applications, is
                                refined by Ant UED Team.
                              </PanelHeader>
                            }
                            key="3"
                            extra={getHandleBar()}
                            showArrow={false}
                            collapsible="disabled"
                          />
                        </Collapse>
                      </Panel>
                    </Collapse>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ListSection>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default BodyList
