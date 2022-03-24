import React from 'react'
import { useParams } from 'react-router-dom'

import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentForm from '../../../../components/Components/Form'

const ComponentBlockForm = (props) => {
  const { orgId, orgName } = props
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
      <ComponentForm>
        <h1 style={{ fontSize: '2rem' }}>Block form</h1>
      </ComponentForm>
    </React.Fragment>
  )
}

export default ComponentBlockForm
