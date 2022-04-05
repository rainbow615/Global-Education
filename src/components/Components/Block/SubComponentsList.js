import React, { useState } from 'react'
import { Button, Space, Tag } from 'antd'
import { HolderOutlined, DeleteOutlined } from '@ant-design/icons'

import { getFirstLetter } from '../../../utils'
import { ComponentsListView, SubComponentRow, HTMLViewer } from './styles'

const getHandleBar = () => <HolderOutlined style={{ fontSize: 22, cursor: 'pointer' }} />
const getRemoveBar = () => (
  <Button
    icon={<DeleteOutlined style={{ fontSize: 20, cursor: 'pointer' }} />}
    className="remove-button"
  />
)

const data = [
  {
    component_type: 'text',
    component_content: '<p>If 12-Lead EKG shows STEMI, notify BH and transport to STEMI center</p>',
  },
]

const SubComponentList = () => {
  return (
    <ComponentsListView>
      {data.map((item, index) => (
        <SubComponentRow key={index}>
          <Space>
            <Tag>{getFirstLetter(item.component_type)}</Tag>
            <HTMLViewer dangerouslySetInnerHTML={{ __html: item.component_content }} />
          </Space>
          <Space align="center">
            {getRemoveBar()}
            {getHandleBar()}
          </Space>
        </SubComponentRow>
      ))}
    </ComponentsListView>
  )
}

export default SubComponentList
