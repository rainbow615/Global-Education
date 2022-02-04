import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { getUser, removeUser, removeConfirmLogin } from '../../utils/cookie'
import Logo from '../../assets/img/logo-light.svg'
import { CustomHeader } from './styles'

const PortalHeader = () => {
  const navigate = useNavigate()
  const profile = getUser()

  const onLogout = useCallback(() => {
    removeUser()
    removeConfirmLogin()
    navigate('/home')
  }, [navigate])

  const userDropdown = useMemo(
    () => (
      <Menu theme="dark">
        <Menu.Item key="profile">
          <Link to="/profile" className="top-menu-item">
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Button type="text" onClick={onLogout} danger className="top-menu-item">
            Log out
          </Button>
        </Menu.Item>
      </Menu>
    ),
    [onLogout]
  )

  return (
    <CustomHeader>
      <img alt="Mission Critical Protocols" src={Logo} />
      <Dropdown
        overlayClassName="top-dropdown-menu"
        overlay={userDropdown}
        placement="bottomRight"
        trigger="click"
      >
        <Button type="text">
          {profile?.full_name} <DownOutlined />
        </Button>
      </Dropdown>
    </CustomHeader>
  )
}

export default PortalHeader
