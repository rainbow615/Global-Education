import React from 'react'
import { Result, Space } from 'antd'
import { Link } from 'react-router-dom'

import { LinkButton } from '../CommonComponent'

export const ResultFailed = (props) => {
  const { title, subTitle } = props

  return (
    <Space direction="vertical" align="center">
      <Result
        status="error"
        title={title ? title : 'Load Failed'}
        subTitle={subTitle ? subTitle : 'Sorry, something went wrong. please retry later.'}
        extra={[
          <LinkButton align="center" key="home">
            <Link to="/home">Back to home</Link>
          </LinkButton>,
        ]}
      />
    </Space>
  )
}
