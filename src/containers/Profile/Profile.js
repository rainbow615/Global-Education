import React from 'react'

import { useUser } from '../../services/userService'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/CustomBreadcrumb'
import CustomLoading from '../../components/Loading/Loading'
import { ResultFailed } from '../../components/ResultPages'
import PersonalInfo from './PersonalInfo'
import PermissionInfo from './PermissionInfo'
import { getUser } from '../../utils/cookie'
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
  const { user_id } = getUser()
  const { data: user, error } = useUser(user_id)

  console.log('========dd', user, error)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (user?.isLoading) {
    return <CustomLoading />
  }

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <LeftSection>
          <PersonalInfo data={user} />
        </LeftSection>
        <RightSection>
          <PermissionInfo />
        </RightSection>
      </Root>
    </React.Fragment>
  )
}

export default Profile
