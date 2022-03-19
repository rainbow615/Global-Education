import styled from 'styled-components'
import { Space } from 'antd'

import { Container } from '../../../../components/CommonComponent'

export const Topbar = styled(Space)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Root = styled(Container)`
  justify-content: space-between;
`

export const TitleView = styled.div`
  .sub-title {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-top: 20px;
  }
`
