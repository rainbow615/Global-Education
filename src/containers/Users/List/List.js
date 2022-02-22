import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tag } from 'antd'
import { debounce, map, get } from 'lodash'

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
import { SEARCH_DELAY } from '../../../config/constants'

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
    render: (_, record) => (
      <Button type="primary">
        <Link to="/users/manage" state={record}>
          Manage
        </Link>
      </Button>
    ),
  },
]

const UsersList = () => {
  const { data: users, error } = useUsersList()
  const [searchText, setSearchText] = useState('')

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = users?.data
    ? map(users.data, (record, index) => {
        const _record = {
          key: index + 1,
          id: record.user_id,
          name: record.full_name,
          registered: formatLocalizedDate(record.created_date),
          role: record.role_name,
          ...record,
        }

        if (searchText) {
          const reg = new RegExp(searchText, 'gi')
          const nameMatch = get(_record, 'name').match(reg)
          const emailMatch = get(_record, 'email').match(reg)
          const roleMatch = get(_record, 'role').match(reg)

          if (!nameMatch && !emailMatch && !roleMatch) {
            return null
          }
        }

        return _record
      }).filter((record) => !!record)
    : []

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Button type="primary">
            <Link to="/users/form/new">Add new</Link>
          </Button>
          <CustomSearchText
            placeholder="Search"
            enterButton
            allowClear
            onChange={debouncedSearchHandler}
            onPressEnter={debouncedSearchHandler}
          />
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
