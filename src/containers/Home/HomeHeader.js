import { Menu } from 'antd'
import { Link } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'

import Logo from '../../assets/img/logo-dark.svg'
import { CustomHeader, CustomMenu } from './styles'

const HomeHeader = () => {
  return (
    <CustomHeader>
      <img alt="Mission Critical Protocols" src={Logo} />
      <CustomMenu mode="horizontal" selectable={false}>
        <Menu.Item key="app">
          <Link to="app" spy={true} smooth={true} duration={500}>
            Mobile Apps
          </Link>
        </Menu.Item>
        <Menu.Item key="book">
          <Link to="book" spy={true} smooth={true} duration={500}>
            Books
          </Link>
        </Menu.Item>
        <Menu.Item key="protocol">
          <Link to="protocol" spy={true} smooth={true} duration={500}>
            CMS
          </Link>
        </Menu.Item>
        <Menu.Item key="licensing">
          <Link to="licensing" spy={true} smooth={true} duration={500}>
            Licenses
          </Link>
        </Menu.Item>
        <Menu.Item key="login" className="login">
          <RouterLink to={'/login'}>Login</RouterLink>
        </Menu.Item>
      </CustomMenu>
    </CustomHeader>
  )
}

export default HomeHeader
