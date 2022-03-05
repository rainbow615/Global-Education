import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { debounce, map, get } from 'lodash'

import { useUsersList } from '../../../services/userService'
import { formatLocalizedDate, regExpEscape } from '../../../utils'
import { SEARCH_DELAY } from '../../../config/constants'
import USERS_COLUMNS from './columns'
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
          const reg = new RegExp(regExpEscape(searchText), 'gi')
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
          columns={USERS_COLUMNS}
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
