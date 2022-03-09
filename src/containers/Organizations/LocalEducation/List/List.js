import React from 'react'

import EducationList from '../../../../components/Education/List'

const breadCrumb = [
  {
    title: 'Organizations',
    link: '/organizations/list',
  },
  {
    title: 'Local Education',
  },
  {
    title: 'List',
  },
]

const LocalEducationList = (props) => {
  const { orgId } = props

  return <EducationList breadCrumb={breadCrumb} orgId={orgId} />
}

export default LocalEducationList
