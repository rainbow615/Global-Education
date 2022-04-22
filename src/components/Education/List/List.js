import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce, map, get } from 'lodash'
import { Button } from 'antd'

import { useEducations } from '../../../services/jitService'
import { formatLocalizedDate, regExpEscape } from '../../../utils'
import { getJITStatusName } from '../../../utils/names'
import { SEARCH_DELAY } from '../../../config/constants'
import getColumns from './columns'
import CustomBreadcrumb from '../../CustomBreadcrumb/CustomBreadcrumb'
import { ResultFailed } from '../../ResultPages'
import { Container, CustomTable, CustomTableHeader, CustomSearchText } from '../../CommonComponent'

const EducationList = (props) => {
  const { breadCrumb, isGlobal, orgId } = props
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'

  const { data: educations, error } = useEducations(orgId || null)
  const [searchText, setSearchText] = useState('')

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = educations?.data
    ? map(educations.data, (record, index) => {
        const _record = {
          key: index + 1,
          jit_id: record.jit_id,
          orgId: record.organization_id,
          document_number: record.document_number || '',
          parent_id: record.parent_id,
          jit_name: record.jit_name,
          jit_content: record.jit_content,
          created: formatLocalizedDate(record.created_date, 'L'),
          updated: formatLocalizedDate(record.modified_date, 'L'),
          last_published_date: record.last_published_date,
          status: record.status,
          status_name: getJITStatusName(record.status),
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const docNumberMatch = get(_record, 'document_number').match(reg)
          const nameMatch = get(_record, 'jit_name').match(reg)
          const statusMatch = get(_record, 'status_name').match(reg)

          if (!docNumberMatch && !nameMatch && !statusMatch) {
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
            <Link to={`/${prefixLink}education/form/new`} state={{ orgId }}>
              Add new
            </Link>
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
          columns={getColumns(isGlobal)}
          loading={educations?.isLoading}
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            y: 500,
            x: 800,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default EducationList
