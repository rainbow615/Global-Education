import React from 'react'
import { useParams } from 'react-router-dom'

import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentText from '../../../../components/Components/Text'
import { Root } from './styles'

const ComponentTextForm = (props) => {
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
      title: type === 'edit' ? 'Edit Text' : 'Add Text',
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <ComponentText orgId={orgId} isNew={type === 'add'} data={data} />
      </Root>
    </React.Fragment>
  )
}

export default ComponentTextForm
