import React from 'react'
import { Space, Spin } from 'antd'

import { Root } from './styles'

const CustomLoading = () => {
  return (
    <Root direction="vertical">
      <Spin size="large" />
    </Root>
  )
}

export default CustomLoading
