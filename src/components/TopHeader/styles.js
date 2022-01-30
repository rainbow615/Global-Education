import styled from 'styled-components'
import { Button, Layout, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const { Header } = Layout

export const CustomHeader = styled(Header)`
  position: relative;
  background: ${(props) => props.theme.palette.white};
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 100%;
  }

  .ant-menu {
    width: 100px;
  }
`

export const CustomMenu = styled(Menu)`
  flex: 1;
  justify-content: flex-end;
  border-bottom: 0;

  .ant-menu-title-content {
    font-size: 1rem;
    font-weight: 500;
  }

  .login::after {
    border-bottom-color: ${(props) => props.theme.palette.textColor};
    border-bottom-width: 3px !important;
  }
`

export const HamburgerButton = styled(Button)`
  position: fixed;
  top: 20px;
  right: 50px;
`

export const HamburgerIcon = styled(MenuOutlined)`
  font-size: 30px;
`
