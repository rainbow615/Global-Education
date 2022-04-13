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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (value) => <Tag color="green">{value}</Tag>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <Text type={value === ORG_ACTIONS.PUBLISHED ? 'success' : 'danger'}>
        {value === ORG_ACTIONS.PUBLISHED ? 'Published' : 'Not Published'}
      </Text>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 150,
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
