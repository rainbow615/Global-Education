import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import { CustomSide } from './styles'

const navLinks = [
  {
    path: '/organizations',
    pathName: 'Organizations',
  },
  {
    path: '/education',
    pathName: 'JIT Education',
  },
  {
    path: '/users',
    pathName: 'Users',
  },
  {
    path: '/pricing',
    pathName: 'Pricing',
  },
  {
    path: '/licenses',
    pathName: 'Licenses',
  },
]

const PortalSidebar = () => {
  const location = useLocation()

  return (
    <CustomSide width={200} theme="light">
      <Menu theme="light" selectedKeys={[location.pathname]}>
        {navLinks.map((navLink) => {
          const { path, pathName } = navLink
          return (
            <Menu.Item key={path}>
              <NavLink to={path}>{pathName}</NavLink>
            </Menu.Item>
          )
        })}
      </Menu>
    </CustomSide>
  )
}

export default PortalSidebar
