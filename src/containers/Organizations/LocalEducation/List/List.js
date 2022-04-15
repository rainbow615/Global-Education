import React from 'react'

import EducationList from '../../../../components/Education/List'

const LocalEducationList = (props) => {
  const { orgId, orgName } = props

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: orgName,
      link: '/organizations/dashboard',
      state: {
        id: orgId,
        name: orgName,
      },
    },
    {
      title: 'Local Education',
    },
    {
      title: 'List',
    },
  ]

  return <EducationList breadCrumb={breadCrumb} orgId={orgId} />
}

export default LocalEducationList
