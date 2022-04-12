import React from 'react'
import { useParams } from 'react-router-dom'

import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentBlock from '../../../../components/Components/Block'

const ComponentBlockForm = (props) => {
  const { orgId, orgName, data } = props
  const { type } = useParams()

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: `${orgName}`,
    },
    {
      title: `Components`,
      link: '/organizations/components/list',
      state: { orgId, orgName },
    },
    {
      title: type === 'edit' ? 'Edit Block' : 'Add Block',
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <ComponentBlock orgId={orgId} orgName={orgName} isNew={type === 'add'} data={data} />
    </React.Fragment>
  )
}

export default ComponentBlockForm
