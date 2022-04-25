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
import { PROTOCOL_ACTIONS } from '../../../../config/constants'

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
    sorter: (a, b) => a.protocol_number.localeCompare(b.protocol_number),
  },
  {
    title: 'Name',
    dataIndex: 'protocol_name',
    key: 'protocol_name',
    width: 200,
    render: (value, record) => <CopyTooltip value={value} record={record} />,
    sorter: (a, b) => a.protocol_name.localeCompare(b.protocol_name),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value) => (
      <Text type={getProtocolStatusColor(value)}>{getProtocolStatusName(value)}</Text>
    ),
    filters: [
      {
        text: 'Published',
        value: PROTOCOL_ACTIONS.PUBLISHED,
      },
      {
        text: 'In-Review',
        value: PROTOCOL_ACTIONS.INREVIEW,
      },
      {
        text: 'Draft',
        value: PROTOCOL_ACTIONS.DRAFT,
      },
      {
        text: 'Unpublished',
        value: PROTOCOL_ACTIONS.UNPUBLISHED,
      },
      {
        text: 'Deleted',
        value: PROTOCOL_ACTIONS.DELETE,
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    width: 150,

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
    sorter: (a, b) => {
      if (!a.last_published_date) return -1
      if (!b.last_published_date) return 1
      return Date.parse(a.last_published_date) - Date.parse(b.last_published_date)
    },
  },
  {
    title: 'Edited',
    dataIndex: 'modified_date',
    key: 'modified_date',
    align: 'center',
    width: 100,
    sorter: (a, b) => Date.parse(a.modified_date) - Date.parse(b.modified_date),
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Created',
    dataIndex: 'created_date',
    key: 'created_date',
    align: 'center',
    sorter: (a, b) => Date.parse(a.created_date) - Date.parse(b.created_date),
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
