import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce, map, get } from 'lodash'
import { Button } from 'antd'

import { useEducations } from '../../../services/jitService'
import { formatLocalizedDate, getStatusName, regExpEscape } from '../../../utils'
import { SEARCH_DELAY } from '../../../config/constants'
import EDUCATION_COLUMNS from './columns'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { ResultFailed } from '../../../components/ResultPages'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../components/CommonComponent'

const breadCrumb = [
  {
    title: 'Global Education',
  },
  {
    title: 'List',
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
          status_name: getStatusName(record.status),
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const nameMatch = get(_record, 'name').match(reg)
          const statusMatch = get(_record, 'status_name').match(reg)

          if (!nameMatch && !statusMatch) {
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
          columns={EDUCATION_COLUMNS}
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
