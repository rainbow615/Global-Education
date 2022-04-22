import React, { useState } from 'react'
import { debounce, map, get } from 'lodash'
import { Select, Space } from 'antd'

import { useComponents } from '../../../../services/componentService'
import { formatLocalizedDate, regExpEscape } from '../../../../utils'
import { SEARCH_DELAY, COMPONENTS_TYPES } from '../../../../config/constants'
import COMPONENTS_COLUMNS from './columns'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { ResultFailed } from '../../../../components/ResultPages'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../../components/CommonComponent'
import { SearchTypeBox } from './styles'
import AddComponentButton from '../../../../components/Components/AddComponentButton'

const { Option } = Select

const OrgComponentsList = (props) => {
  const { orgId, orgName } = props
  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: orgName,
      link: '/organizations/dashboard',
      state: { id: orgId, name: orgName },
    },
    {
      title: `Components`,
      link: '/organizations/components/list',
      state: { orgId, orgName },
    },
    {
      title: 'List',
    },
  ]

  const [searchType, setSearchType] = useState('all')
  const [searchText, setSearchText] = useState('')

  const { data: components, error } = useComponents(orgId)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSelectType = (value) => {
    setSearchType(value)
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = components?.data
    ? map(components.data, (record, index) => {
        const componentType = get(record, 'component_type')

        if (searchType !== 'all' && componentType !== searchType) {
          return null
        }

        const _record = {
          key: index + 1,
          ...record,
          orgId,
          orgName,
          created_date: formatLocalizedDate(record.created_date),
          modified_date: formatLocalizedDate(record.modified_date),
        }

        if (searchText) {
          const reg = new RegExp(regExpEscape(searchText), 'gi')
          const typeMatch = componentType.match(reg)
          const contentMatch = get(_record, 'component_content').match(reg)

          if (!typeMatch && !contentMatch) {
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
          <Space>
            <AddComponentButton {...props} />
          </Space>
          <Space>
            <SearchTypeBox defaultValue="All" placeholder="Choose..." onSelect={onSelectType}>
              <Option key="all" value="all">
                All
              </Option>
              {COMPONENTS_TYPES.map((type, index) => (
                <Option key={index} value={type.id}>
                  {type.label}
                </Option>
              ))}
            </SearchTypeBox>
            <CustomSearchText
              placeholder="Search"
              enterButton
              allowClear
              onChange={debouncedSearchHandler}
              onPressEnter={debouncedSearchHandler}
            />
          </Space>
        </CustomTableHeader>
        <CustomTable
          dataSource={dataSource}
          columns={COMPONENTS_COLUMNS}
          loading={components.isLoading}
          pagination={{
            pageSize: 10,
          }}
        />
      </Container>
    </React.Fragment>
  )
}

export default OrgComponentsList
