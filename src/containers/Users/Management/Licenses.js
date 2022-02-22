import React from 'react'
import { Button, Table } from 'antd'

import { DateText } from '../../../components/CommonComponent'

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    key: 'organization',
  },
  {
    title: 'Expiration',
    dataIndex: 'expiration',
    key: 'expiration',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
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
    type: 'License',
    name: 'Standard',
    organization: 'Global',
    expiration: '10/22/2022',
    enabled: 'Yes',
    users: '20',
  },
]

const PermissionInfo = () => {
  return (
    <React.Fragment>
      <div className="section-label">
        <span>Licenses / Subscriptions</span>
        <Button>Add</Button>
      </div>
      <Table columns={columns} pagination={false} dataSource={accessData} />
    </React.Fragment>
  )
}

export default PermissionInfo
