import React from 'react'
import { Collapse, Space } from 'antd'
import { HolderOutlined } from '@ant-design/icons'

import { ListSection } from './styles'

const { Panel } = Collapse

const getHandleBar = () => <HolderOutlined style={{ fontSize: 22, cursor: 'pointer' }} />

const BodyList = () => {
  return (
    <ListSection direction="vertical" className="custom-collapse">
      <Collapse expandIconPosition="right">
        <Panel
          header="BLS"
          key="1"
          extra={getHandleBar()}
          showArrow={false}
          collapsible="disabled"
        />
      </Collapse>
      <Collapse expandIconPosition="right">
        <Panel header="ALS" key="2" extra={getHandleBar()}>
          <Space direction="vertical">
            <Collapse expandIconPosition="right">
              <Panel
                header="Monitor / EKG"
                key="3"
                extra={getHandleBar()}
                showArrow={false}
                collapsible="disabled"
              />
            </Collapse>
            <Collapse defaultActiveKey={['1']} expandIconPosition="right">
              <Panel
                header="IV SO"
                key="4"
                extra={getHandleBar()}
                showArrow={false}
                collapsible="disabled"
              />
            </Collapse>
          </Space>
        </Panel>
      </Collapse>
    </ListSection>
  )
}

export default BodyList
