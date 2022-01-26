import { Link } from 'react-router-dom'
import { Menu } from 'antd'

import { CustomSide } from './styles'

const PortalSidebar = () => {
  return (
    <CustomSide width={200} theme="light">
      <Menu theme="light">
        <Menu.Item key="Jurisdictions">
          <Link to="/jurisdictions">Jurisdictions</Link>
        </Menu.Item>
        <Menu.Item key="JIT">
          <Link to="/jit">JIT Education</Link>
        </Menu.Item>
        <Menu.Item key="users">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="pricing">
          <Link to="/pricing">Pricing</Link>
        </Menu.Item>
        <Menu.Item key="licenses">
          <Link to="/licenses">Licenses</Link>
        </Menu.Item>
      </Menu>
    </CustomSide>
  )
}

export default PortalSidebar
