import { CustomFooter } from './styles'
import { Link as RouterLink } from 'react-router-dom'
import { Space } from 'antd'

const HomeFooter = () => {
  return (
    <CustomFooter>
      <Space>Mission Critical Protocols © 2022</Space>
      <RouterLink to="/privacy">Privacy</RouterLink>
    </CustomFooter>
  )
}

export default HomeFooter
