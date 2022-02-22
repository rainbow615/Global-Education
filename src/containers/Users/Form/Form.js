import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Button, List, Space, Select, Typography, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'
import AddNewTeamModal from './AddNewTeamModal'
import AddNewTeamRole from './AddNewRoleModal'
import { Root, RowSection, RegionsCard, RowSectionHeader, AddNewTeamButton } from './styles'

const { Option } = Select
const { Text } = Typography

const teams = [
  {
    id: 'fire-rescue-team',
    name: 'Fire Rescue Team',
  },
  {
    id: 'development-team',
    name: 'Development Team',
  },
]

const emailRules = [
  {
    required: true,
    message: 'Please input your email!',
  },
  {
    type: 'email',
    message: 'Please input valid email',
  },
]

const columns = [
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Organizations',
    dataIndex: 'organizations',
    key: 'organizations',
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    align: 'right',
    width: 100,
    render: () => (
      <Button type="link" danger>
        Remove
      </Button>
    ),
  },
]

const accessData = [
  {
    key: '1',
    role: 'Superuser',
    organizations: 'Global',
  },
  {
    key: '2',
    role: 'Administrator',
    organizations: 'San Diego Co EMS',
  },
]

const UsersForm = () => {
  const { type } = useParams()
  const breadCrumb = [
    {
      title: 'Users',
      link: '/users',
    },
    {
      title: type === 'new' ? 'Add' : 'Edit',
    },
  ]

  const [selectedTeams, setSelectedTeams] = useState([])
  const [teamModalVisible, setTeamModalVisible] = useState(false)
  const [roleModalVisible, setRoleModalVisible] = useState(false)

  const onSelectTeams = (value) => {
    const isCheck = _.findIndex(selectedTeams, { id: value })

    if (isCheck === -1) {
      const newState = _.findIndex(teams, { id: value })
      setSelectedTeams([...selectedTeams, teams[newState]])
    }
  }

  const onRemoveTeams = (id) => () => {
    const isSearch = _.findIndex(selectedTeams, { id: id })
    const newTeam = [...selectedTeams]
    newTeam.splice(isSearch, 1)
    setSelectedTeams(newTeam)
  }

  const onOpenAddNewTeam = () => {
    setTeamModalVisible(true)
  }

  const onOpenAddRole = () => {
    setRoleModalVisible(true)
  }

  const onCloseAddNewTeam = () => {
    setTeamModalVisible(false)
  }

  const onCloseAddNewRole = () => {
    setRoleModalVisible(false)
  }

  const onFinish = () => {}

  const onFinishFailed = () => {}

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <Form
          autoComplete="off"
          initialValues={{}}
          layout="vertical"
          name="users"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item>
            <Form.Item name="email" hasFeedback rules={emailRules} className="email">
              <Input placeholder="Email *" size="large" />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="firstname"
              hasFeedback
              rules={[{ required: true, message: 'Please input First Name' }]}
              className="firstname"
            >
              <Input placeholder="First Name *" size="large" />
            </Form.Item>
            <Form.Item
              name="lastname"
              hasFeedback
              rules={[{ required: true, message: 'Please input Last Name' }]}
              className="lastname"
            >
              <Input placeholder="Last Name *" size="large" />
            </Form.Item>
          </Form.Item>
          <RowSection>
            <div>
              <Select
                className="search-teams"
                placeholder="Search teams"
                size="large"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={onSelectTeams}
              >
                {teams.map((state, index) => (
                  <Option key={index} value={state.id}>
                    {state.name}
                  </Option>
                ))}
                <Option key="action" disabled>
                  <AddNewTeamButton icon={<PlusOutlined />} onClick={onOpenAddNewTeam}>
                    Add new
                  </AddNewTeamButton>
                </Option>
              </Select>
              <RegionsCard>
                <List
                  dataSource={selectedTeams}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button type="link" danger onClick={onRemoveTeams(item.id)}>
                          Remove
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta title={item.name} />
                    </List.Item>
                  )}
                />
              </RegionsCard>
            </div>
            <div>
              <RowSectionHeader>
                <Text>Access</Text>
                <Button onClick={onOpenAddRole}>Add role</Button>
              </RowSectionHeader>
              <Table
                className="access-table"
                columns={columns}
                pagination={false}
                dataSource={accessData}
              />
            </div>
          </RowSection>
          <FormActionButtons>
            <div />
            <Space>
              <Button size="large">Invite</Button>
            </Space>
          </FormActionButtons>
        </Form>
        <AddNewTeamModal visible={teamModalVisible} onClose={onCloseAddNewTeam} />
        <AddNewTeamRole visible={roleModalVisible} onClose={onCloseAddNewRole} />
      </Root>
    </React.Fragment>
  )
}

export default UsersForm
