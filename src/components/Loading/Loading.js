import React from 'react'
import { Spin } from 'antd'

import { Root } from './styles'

const CustomLoading = (props) => {
  const { size } = props
  return (
    <Root direction="vertical">
      <Spin size={size || 'large'} />
    </Root>
  )
}

export default CustomLoading
