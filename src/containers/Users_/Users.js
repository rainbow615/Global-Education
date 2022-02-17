import { useState, useCallback, useMemo } from 'react'
import moment from 'moment'

import { Table, Input, Button, Space, Row, Col, Modal } from 'antd'
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
} from '@ant-design/icons'

import CreateUserModal from './CreateUserModal'
import EditUserModal from './EditUserModal'

import { deleteUser, useUsers } from '../../services/userService'
import { useDebounce } from '../../hooks/useDebounce'

const EventUsers = () => {
  const { data: users, mutate } = useUsers()

  const [activeModal, setActiveModal] = useState()
  const [editingUser, setEditingUser] = useState()
  const [searchText, setSearchText] = useState('')
  const debouncedSearchTerm = useDebounce(searchText)

  const dataSource = users.map((u) => ({ ...u, key: u.id }))

  const columns = [
    {
      title: '#',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      width: 100,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (value, record) => (
        <Button type="link" style={{ padding: 0 }} onClick={() => openModal('edit-user', record)}>
          {value}
        </Button>
      ),
    },
    {
      title: 'Group',
      dataIndex: 'group',
    },
    {
      title: 'Registration Date',
      dataIndex: 'createdAt',
      align: 'right',
      width: 120,
      render: (value) => moment(new Date(value)).format('MMM Do, hh:mm zz'),
    },
    {
      title: 'Actions',
      align: 'right',
      fixed: 'right',
      width: 102,
      render: (_text, record) => (
        <Row justify="end">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1890ff' }} />}
            onClick={() => openModal('edit-user', record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(record)}
            danger
          />
        </Row>
      ),
    },
  ]

  const openDeleteModal = (user) => {
    Modal.confirm({
      title: `Delete ${user.email}`,
      icon: <ExclamationCircleOutlined />,
      content:
        "User won't have access to the event once you take action, do you really want to proceed with removal?",
      okButtonProps: { danger: true },
      onOk: () => deleteUser(user),
    })
  }

  const openModal = (modalId, user) => {
    setActiveModal(modalId)
    user && setEditingUser(user)
  }
  const closeModal = () => {
    setActiveModal()
    setEditingUser()
  }

  const filteredData = debouncedSearchTerm
    ? dataSource.filter((data) =>
        JSON.stringify(data).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : dataSource

  return (
    <>
      <Space style={{ width: '100%' }} direction="vertical">
        <Row justify="end" gutter={16}>
          <Col flex="auto">
            <Input
              placeholder="Find users by Email"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col>
            <Button onClick={() => setActiveModal('create-user')}>+ Create new user</Button>
          </Col>
        </Row>
        <Table
          loading={users.isLoading}
          columns={columns}
          dataSource={filteredData}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
      <EditUserModal
        visible={activeModal === 'edit-user'}
        user={editingUser}
        onClose={closeModal}
      />
      <CreateUserModal visible={activeModal === 'create-user'} onClose={closeModal} />
    </>
  )
}

export default EventUsers
