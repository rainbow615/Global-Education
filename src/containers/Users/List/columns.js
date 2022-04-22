import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { DateText } from '../../../components/CommonComponent'
import { CustomTag } from './styles'

const USERS_COLUMNS = [
  {
    title: 'Roles',
    dataIndex: 'role',
    key: 'role',
    width: 100,
    render: (value) => <CustomTag color="default">{value.toUpperCase()}</CustomTag>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 125,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 150,
  },
  {
    title: 'Registered',
    dataIndex: 'registered',
    key: 'registered',
    align: 'center',
    width: 80,
    render: (value) => <DateText>{value}</DateText>,
  },

  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    width: 80,
    fixed: 'right',
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
