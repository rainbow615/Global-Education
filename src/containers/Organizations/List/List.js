import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Menu, Tag, Typography } from 'antd'
import { debounce, map, get } from 'lodash'
import { DownOutlined } from '@ant-design/icons'

import { useOrganizations } from '../../../services/organizations'
import { formatLocalizedDate } from '../../../utils'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { ResultFailed } from '../../../components/ResultPages'
import { PUBLISHED_STATE, SEARCH_DELAY } from '../../../config/constants'
import {
  Container,
  CustomTable,
  CustomTableHeader,
  CustomSearchText,
} from '../../../components/CommonComponent'
import { DateText, ActionsMenu } from './styles'

const { Text } = Typography

const breadCrumb = [
  {
    title: 'Organizations',
  },
  {
    title: 'List',
  },
]

const menu = (
  <ActionsMenu>
    <Menu.Item key="1">Protocols</Menu.Item>
    <Menu.Item key="2">Components</Menu.Item>
    <Menu.Item key="3">JIT Education</Menu.Item>
  </ActionsMenu>
)

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Region',
    dataIndex: 'regions',
    key: 'regions',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
    render: (value) => <DateText>{value}</DateText>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (value) => <Tag color="green">{value}</Tag>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <Text type={value === PUBLISHED_STATE.PUBLISHED ? 'success' : 'danger'}>
        {value === PUBLISHED_STATE.PUBLISHED ? 'Published' : 'Not Published'}
      </Text>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 150,
    render: (_, record) => (
      <Dropdown.Button
        overlay={menu}
        placement="bottomRight"
        icon={<DownOutlined />}
        type="primary"
      >
        <Link to="/organizations/form/edit" state={record}>
          Enter
        </Link>
      </Dropdown.Button>
    ),
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
          regions: `${record.region} (${record.state})`,
          created: formatLocalizedDate(record.created_date),
          type: record.type,
          region: record.region,
          state: record.state,
          status: record.status,
        }

        if (searchText) {
          const reg = new RegExp(searchText, 'gi')
          const nameMatch = get(_record, 'name').match(reg)
          const regionsMatch = get(_record, 'regions').match(reg)
          const typeMatch = get(_record, 'type').match(reg)

          if (!nameMatch && !regionsMatch && !typeMatch) {
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
          columns={columns}
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
