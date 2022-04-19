import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, Collapse, Space, Tag } from 'antd'
import { HolderOutlined, DeleteOutlined } from '@ant-design/icons'

import { getFirstLetter } from '../../../../../utils'
import { ListSection, PanelHeader, HTMLViewer } from './styles'

const { Panel } = Collapse
const getHandleBar = () => <HolderOutlined style={{ fontSize: 22, cursor: 'pointer' }} />

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  margin: `0 0 10px 0`,
  boxShadow: isDragging ? 'black 0px 0px 1px' : 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const BodyList = (props) => {
  const { bodyData, onChange } = props

  const [list, setList] = useState([])

  useEffect(() => {
    setList(bodyData)
  }, [bodyData])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(list, result.source.index, result.destination.index)

    setList(items)
    onChange(items)
  }

  const onRemove = (id) => (e) => {
    e.stopPropagation()

    const index = _.findIndex(list, { component_id: id })
    const items = [...list]
    items.splice(index, 1)

    setList(items)
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
                    style={getItemStyle(provided.draggableProps.style, snapshot.isDragging)}
                  >
                    <Collapse expandIconPosition="right">
                      <Panel
                        header={
                          <PanelHeader>
                            <Space className="remove-button-wrap">
                              {getRemoveBar(item.component_id)}
                            </Space>
                            <Tag>{getFirstLetter(item.component_type)}</Tag>
                            <HTMLViewer
                              dangerouslySetInnerHTML={{ __html: item.component_content }}
                            />
                          </PanelHeader>
                        }
                        key="1"
                        extra={getHandleBar()}
                      >
                        {/* <Collapse expandIconPosition="right">
                          <Panel
                            header={<PanelHeader>Monitor / EKG</PanelHeader>}
                            key="3"
                            extra={getHandleBar()}
                            showArrow={false}
                            collapsible="disabled"
                          />
                        </Collapse> */}
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
