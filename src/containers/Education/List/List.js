import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce, map, get } from 'lodash'
import { Button, Typography } from 'antd'

import { useEducations } from '../../../services/jitService'
import { formatLocalizedDate, regExpEscape } from '../../../utils'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { ResultFailed } from '../../../components/ResultPages'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
  DateText,
} from '../../../components/CommonComponent'
import { JIT_ACTIONS, SEARCH_DELAY, JIT_RETURN_LINK } from '../../../config/constants'

const { Text } = Typography

const breadCrumb = [
  {
    title: 'Global Education',
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
      <Text
        type={
          value === JIT_ACTIONS.PUBLISHED
            ? 'success'
            : value !== JIT_ACTIONS.DELETED
            ? 'warning'
            : 'danger'
        }
      >
        {value === JIT_ACTIONS.PUBLISHED && 'Published'}
        {value === JIT_ACTIONS.UNPUBLISHED && 'In-Review'}
        {value === JIT_ACTIONS.DRAFT && 'Draft'}
        {value === JIT_ACTIONS.INREVIEW && 'In-Review'}
        {value === JIT_ACTIONS.APPROVED && 'Approved'}
        {value === JIT_ACTIONS.DELETED && 'Deleted'}
      </Text>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: (_, record) =>
      record.status !== JIT_ACTIONS.DELETED ? (
        <Button type="primary">
          <Link to={JIT_RETURN_LINK[record.status]} state={record}>
            {record.status === JIT_ACTIONS.DRAFT ? 'Edit' : 'View'}
          </Link>
        </Button>
      ) : (
        ''
      ),
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
          parent_id: record.parent_id,
          name: record.jit_name,
          content: record.jit_content,
          created: formatLocalizedDate(record.created_date),
          updated: formatLocalizedDate(record.modified_date),
          status: record.status,
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
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
          loading={jits?.isLoading}
          pagination={{
            pageSize: 10,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default EducationList
