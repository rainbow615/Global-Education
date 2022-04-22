import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { DateText } from '../../../../components/CommonComponent'
import { ComponentType } from '../../Dashboard/styles'
import { ContentCell } from './styles'
import { ActionButton } from '../../Protocols/List/styles'

const COMPONENTS_COLUMNS = [
  {
    title: 'Type',
    dataIndex: 'component_type',
    key: 'component_type',
    width: 60,
    render: (value) => <ComponentType>{value[0].toUpperCase()}</ComponentType>,
  },
  {
    title: 'Content',
    dataIndex: 'component_content',
    key: 'component_content',
    render: (value) => <ContentCell dangerouslySetInnerHTML={{ __html: value }} />,
    width: 250,
  },
  {
    title: 'Used',
    dataIndex: 'backref',
    key: 'backref',
    render: (value) => <DateText>{value ? value.length : 0}</DateText>,
    width: 80,
    align: 'center',
  },
  {
    title: 'Links',
    dataIndex: 'linked_education',
    key: 'linked_education',
    width: 80,
    align: 'center',
    render: (value) => <DateText>{value ? value.length : 0}</DateText>,
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
    title: 'Updated',
    dataIndex: 'modified_date',
    key: 'modified_date',
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
        <Link to={`/organizations/components/form/${record.component_type}/edit`} state={record}>
          Edit
        </Link>
      </ActionButton>
    ),
  },
]

export default COMPONENTS_COLUMNS
