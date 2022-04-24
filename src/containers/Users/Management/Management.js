import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Divider, Space } from 'antd'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Container, FormActionButtons } from '../../../components/CommonComponent'
import UserInfo from './UserInfo'
import PermissionInfo from './PermissionInfo'
import Licenses from './Licenses'
import { LeftSection, RightSection, TableSection } from './styles'

const UserManagement = () => {
  const location = useLocation()

  const breadCrumb = [
    {
      title: 'Users',
      link: '/users',
    },
    {
      title: 'Profile',
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container style={{ maxWidth: '45rem' }}>
        <LeftSection>
          <UserInfo data={location?.state} />
        </LeftSection>
        <RightSection>
          <PermissionInfo />
        </RightSection>
        <TableSection>
          <Licenses />
        </TableSection>
        <Divider />
        <FormActionButtons>
          <Space>
            <Button type="link" size="large" danger>
              Delete user
            </Button>
            <Button size="large">Disable user</Button>
          </Space>
          <Button size="large" type="primary" ghost>
            Reset password
          </Button>
        </FormActionButtons>
      </Container>
    </React.Fragment>
  )
}

export default UserManagement
