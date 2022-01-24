import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Dropdown, Button, Spin } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import CircleLoading from '../../components/CircleLoading'

import { useProfile } from '../../services/profileService'

const { Header } = Layout

const PortalHeader = () => {
  const { data: profile } = useProfile()

  const userDropdown = useMemo(
    () => (
      <Menu theme="dark">
        <Menu.Item>
          <Button type="text" onClick={() => {}} danger>
            Log out
          </Button>
        </Menu.Item>
      </Menu>
    ),
    []
  )

  return (
    <Header className="portal-header">
      <Dropdown overlay={userDropdown} placement="bottomRight">
        <Button type="text">
          {profile.isLoading && <Spin indicator={<CircleLoading />} />}
          {!profile.isLoading && (
            <>
              {profile?.email} <DownOutlined />
            </>
          )}
        </Button>
      </Dropdown>
    </Header>
  )
}

export default PortalHeader
