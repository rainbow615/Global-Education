import { Link } from 'react-router-dom'
import { stripHtml } from 'string-strip-html'

import { DateText } from '../../../../components/CommonComponent'
import { ComponentType } from '../../Dashboard/styles'
import { ContentCell } from './styles'
import { ActionButton } from '../../Protocols/List/styles'

const COMPONENTS_COLUMNS = [
  {
    title: 'Type',
    dataIndex: 'component_type',
    key: 'component_type',
    width: 70,
    render: (value) => <ComponentType>{value[0].toUpperCase()}</ComponentType>,
    filters: [
      {
        text: 'Text',
        value: 'text',
      },
      {
        text: 'Medication',
        value: 'medication',
      },
      {
        text: 'Block',
        value: 'block',
      },
      {
        text: 'Link',
        value: 'link',
      },
      {
        text: 'Section',
        value: 'section',
      },
    ],
    onFilter: (value, record) => record.component_type.indexOf(value) === 0,
  },
  {
    title: 'Content',
    dataIndex: 'component_content',
    key: 'component_content',
    render: (value) => <ContentCell dangerouslySetInnerHTML={{ __html: value }} />,
    width: 250,
    sorter: (a, b) =>
      stripHtml(a.component_content).result.localeCompare(stripHtml(b.component_content).result),
  },
  {
    title: 'Used',
    dataIndex: 'backref',
    key: 'backref',
    render: (value) => <DateText>{value ? value.length : 0}</DateText>,
    width: 80,
    align: 'center',
    sorter: (a, b) => {
      if (!a.backref) return 1
      if (!b.backref) return -1
      return a.backref.length - b.backref.length
    },
  },
  {
    title: 'Links',
    dataIndex: 'linked_education',
    key: 'linked_education',
    width: 80,
    align: 'center',
    render: (value) => <DateText>{value ? value.length : 0}</DateText>,
    sorter: (a, b) => {
      if (!a.linked_education) return 1
      if (!b.linked_education) return -1
      return a.linked_education.length - b.linked_education.length
    },
  },
  {
    title: 'Created',
    dataIndex: 'created_date',
    key: 'created_date',
    align: 'center',
    width: 120,
    render: (value) => <DateText>{value}</DateText>,
    sorter: (a, b) => Date.parse(a.created_date) - Date.parse(b.created_date),
  },
  {
    title: 'Updated',
    dataIndex: 'modified_date',
    key: 'modified_date',
    align: 'center',
    width: 120,
    render: (value) => <DateText>{value}</DateText>,
    sorter: (a, b) => Date.parse(a.modified_date) - Date.parse(b.modified_date),
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
