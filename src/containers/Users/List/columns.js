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
    filters: [
      {
        text: 'SUPER',
        value: 'super',
      },
      {
        text: 'MOBILEAPP',
        value: 'mobileapp',
      },
    ],
    onFilter: (value, record) => record.role.indexOf(value) === 0,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 125,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 150,
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: 'Registered',
    dataIndex: 'registered',
    key: 'registered',
    align: 'center',
    width: 80,
    render: (value) => <DateText>{value}</DateText>,
    sorter: (a, b) => Date.parse(a.registered) - Date.parse(b.registered),
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
