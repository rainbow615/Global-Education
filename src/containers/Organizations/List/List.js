import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { debounce, map, get } from 'lodash'

import { useOrganizations } from '../../../services/organizations'
import { formatLocalizedDate, regExpEscape } from '../../../utils'
import { ORG_ACTIONS, SEARCH_DELAY } from '../../../config/constants'
import ORG_COLUMNS from './columns'
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
    title: 'Organizations',
  },
  {
    title: 'List',
  },
]

const OrganizationsList = () => {
  const { data: organizations, error } = useOrganizations()
  const [searchText, setSearchText] = useState('')

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = organizations?.data
    ? map(organizations.data, (record, index) => {
        const _record = {
          key: index + 1,
          id: record.organization_id,
          name: record.organization_name,
          description: record.organization_description,
          created: formatLocalizedDate(record.created_date),
          type: record.type,
          region: record.region,
          state: record.state,
          status_text: record.status === ORG_ACTIONS.PUBLISHED ? 'Published' : 'Not Published',
          status: record.status,
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const nameMatch = get(_record, 'name').match(reg)
          const stateMatch = get(_record, 'state').match(reg)
          const typeMatch = get(_record, 'type').match(reg)
          const statusMatch = get(_record, 'status_text').match(reg)

          if (!nameMatch && !stateMatch && !typeMatch && !statusMatch) {
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
            <Link to="/organizations/form/new">Add new</Link>
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
          columns={ORG_COLUMNS}
          loading={organizations?.isLoading}
          pagination={{
            pageSize: 10,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default OrganizationsList
