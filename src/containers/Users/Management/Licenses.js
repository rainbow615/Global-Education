import React from 'react'
import { Button } from 'antd'

import { CustomTable, DateText } from '../../../components/CommonComponent'

const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Name',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    align: 'center',
    key: 'organization',
    width: 125,
  },
  {
    title: 'Expires',
    dataIndex: 'expiration',
    key: 'expiration',
    align: 'center',
    width: 100,
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
    align: 'center',
    width: 80,
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
    align: 'center',
    width: 60,
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
      <CustomTable
        scroll={{
          x: 700,
          y: 400,
        }}
        columns={columns}
        pagination={false}
        dataSource={accessData}
      />
    </React.Fragment>
  )
}

export default PermissionInfo
