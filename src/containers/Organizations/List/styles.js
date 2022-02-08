import styled from 'styled-components'
import { Menu } from 'antd'

export const DateText = styled.div`
  text-align: center;
  font-size: 0.7rem;
  opacity: 0.8;
`

export const ActionsMenu = styled(Menu)`
  li {
    padding: 8px 12px;

    span {
      text-align: center;
    }
  }
`
