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
import { Root, DateText } from './styles'

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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <Text type={value ? 'success' : 'danger'}>{value ? 'Published' : 'Draft'}</Text>
    ),
  },
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
    render: (values) => (
      <DateText>
        <div>{values[0]}</div>
        <div>{values[1]}</div>
      </DateText>
    ),
  },
  {
    title: 'Updated',
    dataIndex: 'updated',
    key: 'updated',
    align: 'center',
    render: (values) => (
      <DateText>
        <div>{values[0]}</div>
        <div>{values[1]}</div>
      </DateText>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: () => <Button type="primary">Edit</Button>,
  },
]

const dataSource = [
  {
    key: 1,
    status: 1,
    name: 'Dystonic Reactions Explained',
    created: ['02/07/2022', 'Chentao Wang'],
    updated: ['02/07/2022', 'Chentao Wang'],
  },
  {
    key: 2,
    status: 0,
    name: 'Allergic Reactions (skin signs)',
    created: ['02/07/2022', 'Chentao Wang'],
    updated: ['02/07/2022', 'Chentao Wang'],
  },
]

const EducationList = () => {
  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Button type="primary">
            <Link to="/education/add">Add new</Link>
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
