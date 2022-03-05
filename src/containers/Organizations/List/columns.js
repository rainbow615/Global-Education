import { Link } from 'react-router-dom'
import { Dropdown, Menu, Tag, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { ORG_ACTIONS } from '../../../config/constants'
import { DateText } from '../../../components/CommonComponent'
import { ActionsMenu } from './styles'

const { Text } = Typography

const menu = (
  <ActionsMenu>
    <Menu.Item key="1">Protocols</Menu.Item>
    <Menu.Item key="2">Components</Menu.Item>
    <Menu.Item key="3">Org Education</Menu.Item>
  </ActionsMenu>
)

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
        overlay={menu}
        placement="bottomRight"
        icon={<DownOutlined />}
        type="primary"
      >
        <Link to="/organizations/form/edit" state={record}>
          Enter
        </Link>
      </Dropdown.Button>
    ),
  },
]

export default ORG_COLUMNS
