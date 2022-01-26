import styled from 'styled-components'
import { Layout } from 'antd'
const { Content, Header } = Layout

export const Root = styled(Layout)`
  height: 100vh;
`

export const CustomHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  h2 {
    color: white;
    margin: 0 0 0 1rem;
  }

  .ant-dropdown-trigger {
    color: white;
  }
`

export const MainView = styled(Content)``
