import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Tag } from 'antd'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../components/CommonComponent'
import { TagsWrap } from './styles'

const breadCrumb = [
  {
    title: 'Users',
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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Registered',
    dataIndex: 'registered',
    key: 'registered',
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
    render: (values) => (
      <TagsWrap>
        {values.map((value, index) => (
          <Tag color="default" key={index}>
            {value}
          </Tag>
        ))}
      </TagsWrap>
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
        <Link to="/users/manage">Manage</Link>
      </Button>
    ),
  },
]

const dataSource = [
  {
    key: 1,
    name: 'John Ehrhart',
    email: 'john@ehrhart.com',
    id: 's333gsdg',
    registerd: 'Feb 9, 2022',
    createdBy: 'John Ehrhart',
    roles: ['Super / Global'],
  },
  {
    key: 2,
    name: 'Jane Smith',
    email: 'jane@smith.com',
    id: 'f352ffsdf',
    registerd: 'Feb 8, 2022',
    createdBy: 'Jane Smith',
    roles: ['Administrator / San Diego', 'Subscriber / Alameda'],
  },
]

const UsersList = () => {
  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Button type="primary">
            <Link to="/users/form/new">Add new</Link>
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

export default UsersList
