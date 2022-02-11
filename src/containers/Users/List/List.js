import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Tag } from 'antd'

import { useUsersList } from '../../../services/userService'
import { formatLocalizedDate } from '../../../utils'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../components/CommonComponent'
import CustomLoading from '../../../components/Loading/Loading'
import { ResultFailed } from '../../../components/ResultPages'
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

// const dataSource = [
//   {
//     key: 1,
//     name: 'John Ehrhart',
//     email: 'john@ehrhart.com',
//     id: 's333gsdg',
//     registerd: 'Feb 9, 2022',
//     createdBy: 'John Ehrhart',
//     roles: ['Super / Global'],
//   },
//   {
//     key: 2,
//     name: 'Jane Smith',
//     email: 'jane@smith.com',
//     id: 'f352ffsdf',
//     registerd: 'Feb 8, 2022',
//     createdBy: 'Jane Smith',
//     roles: ['Administrator / San Diego', 'Subscriber / Alameda'],
//   },
// ]

const UsersList = () => {
  const { data: users, error } = useUsersList()

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (users?.isLoading) {
    return <CustomLoading />
  }

  console.log('==============', users)

  const dataSource = users.data.map((obj, index) => ({
    key: index + 1,
    id: obj.user_id,
    name: obj.full_name,
    email: obj.email,
    registered: formatLocalizedDate(obj.created_date),
    roles: [],
  }))

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
