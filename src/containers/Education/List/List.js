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
import { PUBLISHED_STATE, SEARCH_DELAY } from '../../../config/constants'

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
      <Text type={value === PUBLISHED_STATE.PUBLISHED ? 'success' : 'danger'}>
        {value === PUBLISHED_STATE.PUBLISHED && 'Published'}
        {value === PUBLISHED_STATE.UNPUBLISHED && 'Not published'}
        {value === PUBLISHED_STATE.DRAFT && 'Draft'}
        {value === PUBLISHED_STATE.INREVIEW && 'In review'}
      </Text>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: (_, record) => (
      <Button type="primary">
        <Link
          to={
            record.status !== PUBLISHED_STATE.DRAFT ? '/education/review' : '/education/form/edit'
          }
          state={record}
        >
          Edit
        </Link>
      </Button>
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
          parentId: record.parent_id,
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
