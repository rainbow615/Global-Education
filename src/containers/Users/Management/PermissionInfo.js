import React from 'react'
import { Button, Menu, Space, Table } from 'antd'

import { TableSection, OrgCard } from './styles'

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
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: () => (
      <Button type="link" danger>
        Remove
      </Button>
    ),
  },
]

const accessData = [
  {
    key: '1',
    role: 'Superuser',
    organizations: 'Global',
  },
]

const PermissionInfo = () => {
  return (
    <React.Fragment>
      <Space split={<br />} direction="vertical">
        <TableSection>
          <div className="section-label">
            <span>Teams</span>
            <Button>Add</Button>
          </div>
          <OrgCard>
            <Menu selectable={false}>
              <Menu.Item key="1">
                <span>Mission Critical Protocols</span>
                <Button type="link" danger>
                  Remove
                </Button>
              </Menu.Item>
            </Menu>
          </OrgCard>
        </TableSection>
        <TableSection>
          <div className="section-label">
            <span>Access</span>
            <Button>Add</Button>
          </div>
          <Table columns={columns} pagination={false} dataSource={accessData} />
        </TableSection>
      </Space>
    </React.Fragment>
  )
}

export default PermissionInfo
