import React from 'react'
import { Menu, Space, Table } from 'antd'

import { OrgCard } from './styles'

const columns = [
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: 100,
  },
  {
    title: 'Organizations',
    dataIndex: 'organizations',
    key: 'organizations',
    width: 200,
  },
]

const accessData = [
  {
    key: '1',
    role: 'Superuser',
    organizations: 'Global',
  },
  {
    key: '2',
    role: 'Administrator',
    organizations: 'San Diego Co EMS',
  },
]

const PermissionInfo = () => {
  return (
    <React.Fragment>
      <Space split={<br />} direction="vertical">
        <Space direction="vertical">
          <div className="section-label">Teams</div>
          <OrgCard>
            <Menu selectable={false}>
              <Menu.Item key="1">Mission Critical Protocols</Menu.Item>
              <Menu.Item key="2">San Diego Co EMS</Menu.Item>
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
