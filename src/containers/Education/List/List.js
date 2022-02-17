import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../components/CommonComponent'
import { DateText } from './styles'

const { Text } = Typography

const breadCrumb = [
  {
    title: 'JIT Education',
  },
  {
    title: 'List',
  },
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
      <Text type={value ? 'success' : 'danger'}>{value ? 'Published' : 'Draft'}</Text>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: () => (
      <Button type="primary">
        <Link to="/education/form/edit">Edit</Link>
      </Button>
    ),
  },
]

const dataSource = [
  {
    key: 1,
    status: 1,
    name: 'Dystonic Reactions Explained',
    created: '02/07/2022',
    updated: '02/07/2022',
  },
  {
    key: 2,
    status: 0,
    name: 'Allergic Reactions (skin signs)',
    created: '02/06/2022',
    updated: '02/06/2022',
  },
]

const EducationList = () => {
  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Button type="primary">
            <Link to="/education/form/new">Add new</Link>
          </Button>
          <CustomSearchText placeholder="Search" enterButton allowClear loading={false} />
        </CustomTableHeader>
        <CustomTable
          dataSource={dataSource}
          columns={columns}
          loading={false}
          pagination={{
            pageSize: 10,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default EducationList
