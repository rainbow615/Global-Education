import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import { getMainPathname } from '../../utils'
import { CustomSide } from './styles'
import { FileProtectOutlined, FundOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons'

const navLinks = [
  {
    path: '/organizations',
    pathName: 'Organizations',
  },
  {
    path: '/global-education',
    pathName: 'Global Education',
  },
  {
    path: '/users',
    pathName: 'Users',
  },
  {
    path: '/licenses',
    pathName: 'Licenses',
  },
]

const PortalSidebar = () => {
  const location = useLocation()
  const mainPath = getMainPathname(location.pathname)

  const icons = {
    Organizations: <HomeOutlined />,
    'Global Education': <FundOutlined />,
    Users: <TeamOutlined />,
    Licenses: <FileProtectOutlined />,
  }

  return (
    <CustomSide width={200} theme="light" collapsible>
      <Menu theme="light" selectedKeys={[mainPath]}>
        {navLinks.map((navLink) => {
          const { path, pathName } = navLink
          return (
            <Menu.Item key={path} icon={icons[pathName]}>
              <NavLink to={path}>{pathName}</NavLink>
            </Menu.Item>
          )
        })}
      </Menu>
    </CustomSide>
  )
}

export default PortalSidebar
