import { Descriptions } from 'antd'

import { CustomDescriptions } from '../styles'

const TopInfo = () => {
  return (
    <CustomDescriptions layout="vertical">
      <Descriptions.Item label="ID">klj41kl23jkl1j2</Descriptions.Item>
      <Descriptions.Item label="Created">01/12/2022</Descriptions.Item>
      <Descriptions.Item label="Edited">01/12/2022</Descriptions.Item>
    </CustomDescriptions>
  )
}

export default TopInfo
