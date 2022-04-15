import React from 'react'
import { useParams } from 'react-router-dom'

import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import ComponentMedication from '../../../../components/Components/Medication'
import { Root } from './styles'

const ComponentMedicationForm = (props) => {
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
      title: type === 'edit' ? 'Edit Medication' : 'Add Medication',
    },
  ]

  return (
    <React.Fragment>
      <CustomBreadcrumb items={breadCrumb} />
      <Root>
        <ComponentMedication orgId={orgId} isNew={type === 'add'} data={data} />
      </Root>
    </React.Fragment>
  )
}

export default ComponentMedicationForm
