import React from 'react'

import { useUser } from '../../services/userService'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/CustomBreadcrumb'
import CustomLoading from '../../components/Loading/Loading'
import { ResultFailed } from '../../components/ResultPages'
import { Container } from '../../components/CommonComponent'
import PersonalInfo from './PersonalInfo'
import PermissionInfo from './PermissionInfo'
import { getUser } from '../../utils/cookie'
import { LeftSection, RightSection } from './styles'

const breadCrumb = [
  {
    title: 'Profile',
  },
  {
    title: 'Overview',
  },
]

const Profile = () => {
  const { user_id } = getUser()
  const { data: user, error } = useUser(user_id)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (user?.isLoading) {
    return <CustomLoading />
  }

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Container>
        <LeftSection>
          <PersonalInfo data={user} />
        </LeftSection>
        <RightSection>
          <PermissionInfo />
        </RightSection>
      </Container>
    </React.Fragment>
  )
}

export default Profile
