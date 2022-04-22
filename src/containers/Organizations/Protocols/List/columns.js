import { Link } from 'react-router-dom'
import { Tag, Typography } from 'antd'

import {
  getProtocolStatusName,
  getProtocolStatusColor,
  getProtocolButtonName,
} from '../../../../utils/names'
import CopyTooltip from './CopyTooltip'
import { DateText } from '../../../../components/CommonComponent'
import { ActionButton, TagContainer } from './styles'

const { Text } = Typography

export const returnLinks = {
  PUBLISHED: '/organizations/protocols/proof',
  UNPUBLISHED: '/organizations/protocols/proof',
  DRAFT: '/organizations/protocols/form/edit',
  INREVIEW: '/organizations/protocols/review',
  APPROVED: '/organizations/protocols/proof',
  DELETED: '',
}

const PROTOCOLS_COLUMNS = [
  {
    title: '#',
    dataIndex: 'protocol_number',
    key: 'protocol_number',
    width: 80,
  },
  {
    title: 'Name',
    dataIndex: 'protocol_name',
    key: 'protocol_name',
    width: 200,
    render: (value, record) => <CopyTooltip value={value} record={record} />,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (value) => (
      <Text type={getProtocolStatusColor(value)}>{getProtocolStatusName(value)}</Text>
    ),
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    width: 200,

    render: (values) => (
      <TagContainer>
        {values.map((value, index) => (
          <Tag key={index}>{value}</Tag>
        ))}
      </TagContainer>
    ),
  },

  {
    title: 'Last published',
    dataIndex: 'last_published_date',
    key: 'last_published_date',
    align: 'center',
    width: 100,
    render: (value) => <DateText>{value || 'Never'}</DateText>,
  },
  {
    title: 'Edited',
    dataIndex: 'modified_date',
    key: 'modified_date',
    align: 'center',
    width: 100,
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Created',
    dataIndex: 'created_date',
    key: 'created_date',
    align: 'center',
    width: 120,
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
      <ActionButton type="primary">
        <Link to={returnLinks[record.status]} state={record}>
          {getProtocolButtonName(record.status)}
        </Link>
      </ActionButton>
    ),
  },
]

export default PROTOCOLS_COLUMNS
