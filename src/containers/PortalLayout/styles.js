import styled from 'styled-components'
import { Layout } from 'antd'

const { Content, Header, Sider } = Layout

export const Root = styled(Layout)`
  height: 100vh;
`

export const CustomHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  img {
    height: 100%;
  }

  .ant-dropdown-trigger {
    color: white;
  }
`

export const CustomSide = styled(Sider)`
  padding: 2rem 0 0 0;

  a {
    font-size: 1rem;
  }
`

export const MainView = styled(Content)`
  height: 100%;
  padding: 30px 40px;
  overflow-y: auto;
`
