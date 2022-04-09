import React, { useEffect, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { Link as RouterLink } from 'react-router-dom'

import { MOBILE_SIZE, TOP_HEADER_HEIGHT } from '../../config/constants'
import Logo from '../../assets/img/logo-dark.svg'
import { CustomHeader, CustomMenu, HamburgerButton, HamburgerIcon } from './styles'

const TopHeader = (props) => {
  const [isShowHamburger, setIsShowHamburger] = useState(false)

  const onScrollEvent = () => {
    setIsShowHamburger(window.innerWidth <= MOBILE_SIZE || window.pageYOffset > TOP_HEADER_HEIGHT)
  }

  const onresize = () => {
    setIsShowHamburger(window.innerWidth <= MOBILE_SIZE)
  }

  useEffect(() => {
    setIsShowHamburger(window.innerWidth <= MOBILE_SIZE)

    window.addEventListener('scroll', onScrollEvent)
    window.addEventListener('resize', onresize)

    return () => {
      window.removeEventListener('scroll', onScrollEvent)
      window.removeEventListener('resize', onresize)
    }
  }, [])

  const menu = (
    <CustomMenu mode={isShowHamburger ? 'vertical' : 'horizontal'} selectable={false}>
      {props?.menus.map((item) => (
        <Menu.Item key={item.key}>{item.item}</Menu.Item>
      ))}
      <Menu.Item key="login" className="login">
        <RouterLink to={'/login'}>Login</RouterLink>
      </Menu.Item>
    </CustomMenu>
  )

  return (
    <React.Fragment>
      <CustomHeader>
        <img
          alt="Mission Critical Protocols"
          src={Logo}
          style={{
            position: 'relative',
            left: '-.5rem',
          }}
        />
        {!isShowHamburger && menu}
      </CustomHeader>
      {isShowHamburger && (
        <Dropdown
          arrow
          overlay={menu}
          placement="bottomRight"
          trigger="click"
          overlayClassName="home-dropdown-menu"
        >
          <HamburgerButton type="primary" icon={<HamburgerIcon />} size="large" />
        </Dropdown>
      )}
    </React.Fragment>
  )
}

export default TopHeader
