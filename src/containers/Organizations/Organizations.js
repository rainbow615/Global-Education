import React from 'react'
import { Button, Dropdown, Menu, Tag } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import CustomBreadcrumb from '../../components/CustomBreadcrumb/CustomBreadcrumb'
import { CustomTable } from '../../components/CommonComponent'
import { Root, TableHeader, CustomSearch, DateText, ActionsMenu } from './styles'

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
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    width: 150,
    render: () => (
      <Dropdown overlay={menu} placement="bottomRight" trigger="click">
        <Button type="primary">
          Enter | <DownOutlined />
        </Button>
      </Dropdown>
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
  },
  {
    key: 2,
    name: 'San Diego County',
    regions: 'California (CA)',
    created: ['01/11/2022', 'Chentao Wang'],
    type: 'EMS',
  },
]

const Organizations = () => {
  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <TableHeader>
          <Button type="primary">Add new</Button>
          <CustomSearch placeholder="Search" enterButton allowClear loading={false} />
        </TableHeader>
        <CustomTable
          dataSource={dataSource}
          columns={columns}
          loading={false}
          pagination={{
            pageSize: 10,
          }}
        />
      </Root>
    </React.Fragment>
  )
}

export default Organizations
