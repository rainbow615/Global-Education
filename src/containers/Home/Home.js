import { Button, Form, Input } from 'antd'

import HomeHeader from './HomeHeader'
import HomeMainContent from './HomeMainContent'
import HomeContactForm from './HomeContactForm'
import HomeFooter from './HomeFooter'

import { Root, CustomContent } from './styles'

const Home = () => {
  return (
    <Root>
      <HomeHeader />
      <CustomContent>
        <HomeMainContent />
        <HomeContactForm />
      </CustomContent>
      <HomeFooter />
    </Root>
  )
}

export default Home
