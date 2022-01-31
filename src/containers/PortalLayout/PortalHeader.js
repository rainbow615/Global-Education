import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Typography, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { getUser, removeUser, removeConfirmLogin } from '../../utils/cookie'
import Logo from '../../assets/img/logo-light.svg'
import { CustomHeader } from './styles'

const { Title } = Typography

const PortalHeader = () => {
  const navigate = useNavigate()
  const profile = getUser()

  const onLogout = useCallback(() => {
    removeUser()
    removeConfirmLogin()
    navigate('/jurisdictions')
  }, [navigate])

  const userDropdown = useMemo(
    () => (
      <Menu theme="dark">
        <Menu.Item key="logout">
          <Button type="text" onClick={onLogout} danger>
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
      <Dropdown overlay={userDropdown} placement="bottomRight">
        <Button type="text">
          {profile?.full_name} <DownOutlined />
        </Button>
      </Dropdown>
    </CustomHeader>
  )
}

export default PortalHeader
