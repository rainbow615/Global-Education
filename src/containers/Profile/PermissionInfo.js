import React from 'react'
import { Menu, Space, Table } from 'antd'

import { OrgCard } from './styles'

const columns = [
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: 100
  },
  {
    title: 'Jurisdiction',
    dataIndex: 'jurisdiction',
    key: 'jurisdiction',
    width: 200
  },
]

const accessData = [
  {
    key: '1',
    role: 'Superuser',
    jurisdiction: 'Global',
  },
  {
    key: '2',
    role: 'Administrator',
    jurisdiction: 'Global',
  },
]

const PermissionInfo = () => {
  return (
    <React.Fragment>
      <Space split={<br />} direction="vertical">
        <Space direction="vertical">
          <div className="section-label">Organizations</div>
          <OrgCard>
            <Menu selectable={false}>
              <Menu.Item key="1">San Diego Fire Rescue Team</Menu.Item>
              <Menu.Item key="2">Development Team</Menu.Item>
            </Menu>
          </OrgCard>
        </Space>
        <Space direction="vertical">
          <div className="section-label">Access</div>
          <Table columns={columns} pagination={false} dataSource={accessData} />
        </Space>
      </Space>
    </React.Fragment>
  )
}

export default PermissionInfo
