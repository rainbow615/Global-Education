import { Link } from 'react-router-dom'
import { Dropdown, Menu, Tag, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { ORG_ACTIONS } from '../../../config/constants'
import { ActionsMenu } from './styles'
import { DateText } from '../../../components/CommonComponent'

const { Text } = Typography

const menu = (orgId, orgName) => {
  return (
    <ActionsMenu>
      <Menu.Item key="1">
        <Link to="/organizations/protocols/list" state={{ orgId, orgName }}>
          Protocols
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/organizations/components/list" state={{ orgId, orgName }}>
          Components
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/organizations/local-education/list" state={{ orgId }}>
          Org Education
        </Link>
      </Menu.Item>
    </ActionsMenu>
  )
}

const ORG_COLUMNS = [
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width: 60,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 250,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: 'Published',
        value: ORG_ACTIONS.PUBLISHED,
      },
      {
        text: 'Draft',
        value: ORG_ACTIONS.UNPUBLISHED || ORG_ACTIONS.DELETE,
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (value) => (
      <Text type={value === ORG_ACTIONS.PUBLISHED ? 'success' : 'danger'}>
        {value === ORG_ACTIONS.PUBLISHED ? 'Published' : 'Draft'}
      </Text>
    ),
    width: 100,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (value) => <Tag color="green">{value}</Tag>,
    align: 'center',
    width: 100,
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
    width: 100,
    sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created),
  },

  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    fixed: 'right',
    width: 100,
    render: (_, record) => (
      <Dropdown.Button
        overlay={menu(record.id, record.name)}
        placement="bottomRight"
        icon={<DownOutlined />}
        type="primary"
      >
        <Link to={`/organizations/dashboard`} state={record}>
          Enter
        </Link>
      </Dropdown.Button>
    ),
  },
]

export default ORG_COLUMNS
