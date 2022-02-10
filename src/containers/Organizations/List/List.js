import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Menu, Tag, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { useOrganizations } from '../../../services/organizations'
import { formatLocalizedDate } from '../../../utils'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import CustomLoading from '../../../components/Loading/Loading'
import { ResultFailed } from '../../../components/ResultPages'
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
      <Text type={value ? 'success' : 'danger'}>{value ? 'Published' : 'Not Published'}</Text>
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

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (organizations?.isLoading) {
    return <CustomLoading />
  }

  const dataSource = organizations.data.map((obj, index) => ({
    key: index + 1,
    name: obj.organization_name,
    description: obj.organization_description,
    regions: `${obj.region} (${obj.state})`,
    created: formatLocalizedDate(obj.created_date),
    type: 'EMS',
    region: obj.region,
    state: obj.state,
    status: 1,
  }))

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Button type="primary">
            <Link to="/organizations/form/new">Add new</Link>
          </Button>
          <CustomSearchText placeholder="Search" enterButton allowClear loading={false} />
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

export default OrganizationsList
