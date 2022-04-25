import { Link } from 'react-router-dom'
import { Typography } from 'antd'

import { DateText } from '../../CommonComponent'
import CopyTooltip from './CopyTooltip'
import { JIT_ACTIONS } from '../../../config/constants'
import { getJITStatusName } from '../../../utils/names'
import { ActionButton } from './styles'

const { Text } = Typography

export const getEducationReturnLinks = (isGlobal) => {
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'
  return {
    PUBLISHED: `/${prefixLink}education/proof`,
    UNPUBLISHED: `/${prefixLink}education/proof`,
    DRAFT: `/${prefixLink}education/form/edit`,
    INREVIEW: `/${prefixLink}education/review`,
    APPROVED: `/${prefixLink}education/proof`,
    DELETED: '',
  }
}

const getColumns = (isGlobal) => {
  const returnLinks = getEducationReturnLinks(isGlobal)

  return [
    {
      title: 'Doc #',
      dataIndex: 'document_number',
      key: 'document_number',
      width: 100,
      sorter: (a, b) => a.document_number.localeCompare(b.document_number),
    },
    {
      title: 'Name',
      dataIndex: 'jit_name',
      key: 'jit_name',
      width: 250,
      render: (value, record) => <CopyTooltip value={value} record={record} />,
      sorter: (a, b) => a.jit_name.localeCompare(b.jit_name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 80,
      filters: [
        {
          text: 'Published',
          value: JIT_ACTIONS.PUBLISHED,
        },
        {
          text: 'Draft',
          value: JIT_ACTIONS.UNPUBLISHED || JIT_ACTIONS.DELETE,
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
          {getJITStatusName(value)}
        </Text>
      ),
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
      align: 'center',
      render: (value) => <DateText>{value}</DateText>,
      width: 100,
      sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created),
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
      width: 80,
      fixed: 'right',
      render: (_, record) =>
        record.status !== JIT_ACTIONS.DELETED ? (
          <ActionButton type="primary">
            <Link to={returnLinks[record.status]} state={record}>
              {record.status === JIT_ACTIONS.DRAFT ? 'Edit' : 'View'}
            </Link>
          </ActionButton>
        ) : (
          ''
        ),
    },
  ]
}

export default getColumns
