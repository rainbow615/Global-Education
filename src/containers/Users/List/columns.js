import { Link } from 'react-router-dom'
import { Button, Tag } from 'antd'

const USERS_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Registered',
    dataIndex: 'registered',
    key: 'registered',
  },
  {
    title: 'Roles',
    dataIndex: 'role',
    key: 'role',
    render: (value) => <Tag color="default">{value}</Tag>,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: (_, record) => (
      <Button type="primary">
        <Link to="/users/manage" state={record}>
          Manage
        </Link>
      </Button>
    ),
  },
]

export default USERS_COLUMNS
