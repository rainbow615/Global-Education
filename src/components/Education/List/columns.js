import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd'

import { DateText } from '../../CommonComponent'
import CopyTooltip from './CopyTooltip'
import { JIT_ACTIONS } from '../../../config/constants'
import { getJITStatusName } from '../../../utils'
import { ActionButton } from './styles'

const { Text } = Typography

const getColumns = (isGlobal) => {
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'
  const returnLinks = {
    PUBLISHED: `/${prefixLink}education/proof`,
    UNPUBLISHED: `/${prefixLink}education/proof`,
    DRAFT: `/${prefixLink}education/form/edit`,
    INREVIEW: `/${prefixLink}education/review`,
    APPROVED: `/${prefixLink}education/proof`,
    DELETED: '',
  }

  return [
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
          {getJITStatusName(value)}
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
