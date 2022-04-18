import React from 'react'
import { useParams } from 'react-router-dom'

import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentSection from '../../../../components/Components/Section'

const ComponentSectionForm = (props) => {
  const { orgId, orgName, data } = props
  const { type } = useParams()

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: orgName,
      link: '/organizations/dashboard',
      state: { id: orgId, name: orgName },
    },
    {
      title: `Components`,
      link: '/organizations/components/list',
      state: { orgId, orgName },
    },
    {
      title: type === 'edit' ? 'Edit Section' : 'Add Section',
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <ComponentSection orgId={orgId} orgName={orgName} isNew={type === 'add'} data={data} />
    </React.Fragment>
  )
}

export default ComponentSectionForm
