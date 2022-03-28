import React from 'react'

import EducationList from '../../../components/Education/List'

const breadCrumb = [
  {
    title: 'Global Education',
  },
  {
    title: 'List',
  },
]

const GlobalEducationList = () => {
  return <EducationList breadCrumb={breadCrumb} isGlobal />
}

export default GlobalEducationList
