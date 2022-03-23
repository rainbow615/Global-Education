import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce, map, get } from 'lodash'
import { Button, Select, Space, Dropdown, Menu } from 'antd'

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

const { Option } = Select

const OrgComponentsList = (props) => {
  const { orgId, orgName } = props
  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: `${orgName}`,
    },
    {
      title: 'Components',
    },
  ]
  const menu = (
    <Menu>
      {COMPONENTS_TYPES.map((type, index) => (
        <Menu.Item key={index}>
          <Link
            to={`/organizations/components/form/${type.toLowerCase()}/add`}
            state={{ orgId, orgName }}
          >
            {type}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  const [searchText, setSearchText] = useState('')

  const { data: components, error } = useComponents(orgId)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  const onSearch = (e) => {
    setSearchText(e.target.value)
  }

  const debouncedSearchHandler = debounce(onSearch, SEARCH_DELAY)

  const dataSource = components?.data
    ? map(components.data, (record, index) => {
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
          const typeMatch = get(_record, 'component_type').match(reg)

          if (!typeMatch) {
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
            <Dropdown overlay={menu} placement="bottom">
              <Button type="primary">Add new</Button>
            </Dropdown>
          </Space>
          <Space>
            <SearchTypeBox defaultValue="All" placeholder="Choose...">
              <Option key="all" value="All">
                All
              </Option>
              {COMPONENTS_TYPES.map((type, index) => (
                <Option key={index} value={type}>
                  {type}
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
