import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { DateText } from '../../../../components/CommonComponent'

const COMPONENTS_COLUMNS = [
  {
    title: 'Type',
    dataIndex: 'component_type',
    key: 'component_type',
    width: 90,
  },
  {
    title: 'Content',
    dataIndex: 'component_content',
    key: 'component_content',
  },
  {
    title: 'Usage Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Linked Education',
    dataIndex: 'linked',
    key: 'linked',
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
    align: 'right',
    width: 120,
    render: (_, record) => (
      <Button type="primary">
        <Link to="/organizations/components/form/edit" state={record}>
          Edit
        </Link>
      </Button>
    ),
  },
]

export default COMPONENTS_COLUMNS
