import { Link } from 'react-router-dom'
import { Tag, Typography } from 'antd'

import {
  getProtocolStatusName,
  getProtocolStatusColor,
  getProtocolButtonName,
} from '../../../../utils'
import { DateText } from '../../../../components/CommonComponent'
import { ActionButton } from './styles'

const { Text } = Typography

const PROTOCOLS_COLUMNS = [
  {
    title: '#',
    dataIndex: 'protocol_number',
    key: 'protocol_number',
    width: 90,
  },
  {
    title: 'Name',
    dataIndex: 'protocol_name',
    key: 'protocol_name',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (values) => (
      <div>
        {values.map((value, index) => (
          <Tag key={index}>{value}</Tag>
        ))}
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <Text type={getProtocolStatusColor(value)}>{getProtocolStatusName(value)}</Text>
    ),
  },
  {
    title: 'Last published',
    dataIndex: 'last_published_date',
    key: 'last_published_date',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Edited',
    dataIndex: 'modified_date',
    key: 'modified_date',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Created',
    dataIndex: 'created_date',
    key: 'created_date',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 120,
    render: (_, record) => (
      <ActionButton type="primary">
        <Link to="/organizations/form/edit" state={record}>
          {getProtocolButtonName(record.status)}
        </Link>
      </ActionButton>
    ),
  },
]

export default PROTOCOLS_COLUMNS
