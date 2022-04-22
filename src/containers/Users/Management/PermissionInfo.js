import React from 'react'
import { Button, List, Space, Table } from 'antd'

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

const teamData = [
  {
    title: 'Mission Critical Protocols',
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
      <Space direction="vertical">
        <TableSection>
          <div className="section-label">
            <span>Teams</span>
            <Button>Add</Button>
          </div>
          <OrgCard>
            <List
              dataSource={teamData}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <Button type="link" danger>
                    Remove
                  </Button>
                </List.Item>
              )}
            />
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
