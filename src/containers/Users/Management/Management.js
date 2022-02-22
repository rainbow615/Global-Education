import React from 'react'
import { useLocation } from 'react-router-dom'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Container } from '../../../components/CommonComponent'
import UserInfo from './UserInfo'
import PermissionInfo from './PermissionInfo'
import { LeftSection, RightSection } from './styles'

const UserManagement = () => {
  const location = useLocation()

  const breadCrumb = [
    {
      title: 'Users',
    },
    {
      title: 'Profile',
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <LeftSection>
          <UserInfo data={location?.state} />
        </LeftSection>
        <RightSection>
          <PermissionInfo />
        </RightSection>
      </Container>
    </React.Fragment>
  )
}

export default UserManagement
