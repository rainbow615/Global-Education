import { CustomFooter } from './styles'
import { Link as RouterLink } from 'react-router-dom'

const HomeFooter = () => {
  return (
    <CustomFooter>
      <div>Mission Critical Protocols © 2022</div>
      <RouterLink to="/privacy">Privacy</RouterLink>
    </CustomFooter>
  )
}

export default HomeFooter
