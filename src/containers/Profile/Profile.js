import React from 'react'

import CustomBreadcrumb from '../../components/CustomBreadcrumb/CustomBreadcrumb'
import PersonalInfo from './PersonalInfo'
import PaymentMethod from './PaymentMethod'
import PermissionInfo from './PermissionInfo'
import { Root, LeftSection, RightSection } from './styles'

const breadCrumb = [
  {
    title: 'Profile',
  },
  {
    title: 'Overview',
  },
]

const Profile = () => {
  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <LeftSection>
          <PersonalInfo />
          <PaymentMethod />
        </LeftSection>
        <RightSection>
          <PermissionInfo />
        </RightSection>
      </Root>
    </React.Fragment>
  )
}

export default Profile
