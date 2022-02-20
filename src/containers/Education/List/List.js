import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce, map, get } from 'lodash'
import { Button, Typography } from 'antd'

import { useEducations } from '../../../services/jitService'
import { formatLocalizedDate } from '../../../utils'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { ResultFailed } from '../../../components/ResultPages'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../components/CommonComponent'
import { SEARCH_DELAY } from '../../../config/constants'
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
  const { data: jits, error } = useEducations(null)
  const [searchText, setSearchText] = useState('')

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = jits?.data
    ? map(jits.data, (record, index) => {
        const _record = {
          key: index + 1,
          id: record.jit_id,
          name: record.jit_name,
          created: formatLocalizedDate(record.created_date),
          updated: formatLocalizedDate(record.modified_date),
          status: record.status,
        }

        if (searchText) {
          const reg = new RegExp(searchText, 'gi')
          const nameMatch = get(_record, 'name').match(reg)

          if (!nameMatch) {
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
            <Link to="/education/form/new">Add new</Link>
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
