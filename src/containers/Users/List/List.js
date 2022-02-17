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
import { ResultFailed } from '../../../components/ResultPages'

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
    dataIndex: 'role',
    key: 'role',
    render: (value) => <Tag color="default">{value}</Tag>,
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

const UsersList = () => {
  const { data: users, error } = useUsersList()

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const dataSource = users?.data
    ? users.data.map((obj, index) => ({
        key: index + 1,
        id: obj.user_id,
        name: obj.full_name,
        email: obj.email,
        registered: formatLocalizedDate(obj.created_date),
        role: obj.role_name,
      }))
    : []

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
          loading={users?.isLoading}
          pagination={{
            pageSize: 10,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default UsersList
