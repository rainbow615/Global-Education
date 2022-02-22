import { Descriptions } from 'antd'

import { formatLocalizedDate } from '../../../../utils'
import { CustomDescriptions } from '../styles'

const TopInfo = (props) => {
  const { created_date, modified_date } = props.data

  return (
    <CustomDescriptions layout="vertical">
      <Descriptions.Item label="Created">
        {formatLocalizedDate(created_date, 'MM/DD/YYYY')}
      </Descriptions.Item>
      <Descriptions.Item label="Edited">
        {formatLocalizedDate(modified_date, 'MM/DD/YYYY')}
      </Descriptions.Item>
    </CustomDescriptions>
  )
}

export default TopInfo
