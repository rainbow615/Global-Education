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
    dataIndex: 'protocol_title',
    key: 'protocol_title',
  },
  {
    title: 'Tags',
    dataIndex: 'protocol_tags',
    key: 'protocol_tags',
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
    dataIndex: 'protocol_status',
    key: 'protocol_status',
    render: (value) => (
      <Text type={getProtocolStatusColor(value)}>{getProtocolStatusName(value)}</Text>
    ),
  },
  {
    title: 'Last published',
    dataIndex: 'protocol_published',
    key: 'protocol_published',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Edited',
    dataIndex: 'protocol_updated',
    key: 'protocol_updated',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Created',
    dataIndex: 'protocol_created',
    key: 'protocol_created',
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
          {getProtocolButtonName(record.protocol_status)}
        </Link>
      </ActionButton>
    ),
  },
]

export default PROTOCOLS_COLUMNS
