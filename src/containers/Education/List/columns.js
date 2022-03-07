import { Link } from 'react-router-dom'
import { Button, Space, Typography, Tooltip } from 'antd'

import { DateText } from '../../../components/CommonComponent'
import CopyTooltip from './CopyTooltip'
import { JIT_ACTIONS, JIT_RETURN_LINK } from '../../../config/constants'
import { getStatusName } from '../../../utils'

const { Text } = Typography

const EDUCATION_COLUMNS = [
  {
    title: 'Doc #',
    dataIndex: 'document_number',
    key: 'document_number',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (value, record) => <CopyTooltip value={value} record={record} />,
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Updated',
    dataIndex: 'updated',
    key: 'updated',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <Text
        type={
          value === JIT_ACTIONS.PUBLISHED
            ? 'success'
            : value !== JIT_ACTIONS.UNPUBLISHED
            ? 'warning'
            : 'danger'
        }
      >
        {getStatusName(value)}
      </Text>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: (_, record) =>
      record.status !== JIT_ACTIONS.DELETED ? (
        <Button type="primary">
          <Link to={JIT_RETURN_LINK[record.status]} state={record}>
            {record.status === JIT_ACTIONS.DRAFT ? 'Edit' : 'View'}
          </Link>
        </Button>
      ) : (
        ''
      ),
  },
]

export default EDUCATION_COLUMNS
