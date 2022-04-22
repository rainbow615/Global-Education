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
      title: 'Document #',
      dataIndex: 'document_number',
      key: 'document_number',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'jit_name',
      key: 'jit_name',
      width: 250,
      render: (value, record) => <CopyTooltip value={value} record={record} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 80,
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
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      align: 'center',
      render: (value) => <DateText>{value}</DateText>,
      width: 100,
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
