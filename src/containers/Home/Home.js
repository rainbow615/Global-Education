import { useState } from 'react'

import HomeHeader from './HomeHeader'
import HomeMainContent from './HomeMainContent'
import HomeContactForm from './HomeContactForm'
import HomeFooter from './HomeFooter'

import { Root, CustomContent } from './styles'

const Home = () => {
  const [topic, setTopic] = useState()

  return (
    <Root>
      <HomeHeader />
      <CustomContent>
        <HomeMainContent onChangeTopic={(type) => setTopic(type)} />
        <HomeContactForm topic={topic} />
      </CustomContent>
      <HomeFooter />
    </Root>
  )
}

export default Home
