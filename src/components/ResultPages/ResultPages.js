import React from 'react'
import { Result } from 'antd'
import { Link } from 'react-router-dom'

import { LinkButton } from '../CommonComponent'
import { Root } from './styles'

export const ResultFailed = (props) => {
  const { title, subTitle, isBackButton = true } = props

  return (
    <Root direction="vertical">
      <Result
        status="error"
        title={title ? title : 'Load Failed'}
        subTitle={subTitle ? subTitle : 'Sorry, something went wrong. please retry later.'}
        extra={[
          isBackButton && (
            <LinkButton align="center" key="home">
              <Link to="/home">Back to home</Link>
            </LinkButton>
          ),
        ]}
      />
    </Root>
  )
}
