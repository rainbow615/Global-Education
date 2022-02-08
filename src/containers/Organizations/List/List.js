import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown, Menu, Tag, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
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
    title: 'Regions',
    dataIndex: 'regions',
    key: 'regions',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
    render: (values) => (
      <DateText>
        <div>{values[0]}</div>
        <div>{values[1]}</div>
      </DateText>
    ),
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
    render: () => (
      <Dropdown.Button
        overlay={menu}
        placement="bottomRight"
        icon={<DownOutlined />}
        type="primary"
      >
        Enter
      </Dropdown.Button>
    ),
  },
]

const dataSource = [
  {
    key: 1,
    name: 'San Diego County',
    regions: 'California (CA)',
    created: ['01/12/2022', 'Chentao Wang'],
    type: 'EMS',
    status: 1,
  },
  {
    key: 2,
    name: 'San Diego County',
    regions: 'California (CA)',
    created: ['01/11/2022', 'Chentao Wang'],
    type: 'EMS',
    status: 0,
  },
]

const OrganizationsList = () => {
  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <CustomTableHeader>
          <Button type="primary">
            <Link to="/organizations/form">Add new</Link>
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
