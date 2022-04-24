import styled from 'styled-components'
import { Button, Layout, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { CenteredContent } from '../../containers/Home/styles'

const { Header } = Layout

export const Logo = styled.img({
  position: 'relative',
  left: '-.5rem',
})

export const CustomHeader = styled(Header)`
  position: relative;
  background: ${(props) => props.theme.palette.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${CenteredContent}

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
  position: relative;

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
  top: 1.75rem;
  right: 1.25rem;
  @media (min-width: 70rem) {
    right: 10vw;
  }
  @media (min-width: 85rem) {
    right: 15vw;
  }
  @media (min-width: 100rem) {
    right: 25vw;
  }
  @media (min-width: 125rem) {
    right: 30vw;
  }
`

export const HamburgerIcon = styled(MenuOutlined)`
  font-size: 30px;
`
