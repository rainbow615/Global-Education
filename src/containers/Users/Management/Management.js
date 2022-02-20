import React from 'react'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { Container } from '../../../components/CommonComponent'
import UserInfo from './UserInfo'
import { LeftSection, RightSection } from './styles'

const UserManagement = () => {
  const breadCrumb = [
    {
      title: 'Users',
    },
    {
      title: 'klj41kl23jkl1j2',
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <LeftSection>
          <UserInfo />
        </LeftSection>
        <RightSection></RightSection>
      </Container>
    </React.Fragment>
  )
}

export default UserManagement
