import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { scroller } from 'react-scroll'
import { ArrowLeftOutlined } from '@ant-design/icons'

import TopHeader from '../../components/TopHeader'
import { Root, CustomContent } from '../Home/styles'
import { BackButton, Title, Description } from './styles'

const menus = [
  {
    key: 'app',
    item: <RouterLink to="/home?section=app">Mobile Apps</RouterLink>,
  },
  {
    key: 'book',
    item: <RouterLink to="/home?section=book">Books</RouterLink>,
  },
]

const Privacy = () => {
  useEffect(() => {
    scroller.scrollTo(0)
  }, [])

  return (
    <Root>
      <TopHeader menus={menus} />
      <CustomContent>
        <BackButton type="link" icon={<ArrowLeftOutlined />} size="large">
          <RouterLink to={'/home'}>Back Home</RouterLink>
        </BackButton>
        <Title>Privacy Policy</Title>
        <Description>
          This privacy policy ("policy") will help you understand how Mission Critical Protocols
          ("us", "we", "our") uses and protects the data you provide to us when you visit and use
          mcprotocols.io (“website”, "service"). We reserve the right to change this policy at any
          given time, of which you will be promptly updated. If you want to make sure that you are
          up to date with the latest changes, we advise you to frequently visit this page.
        </Description>
        <Title>What User Data We Collect</Title>
        <Description>
          When you visit the website, we may collect the following data: -Your IP address. -Your
          contact information and email address. -Other information such as interests and
          preferences. -Data profile regarding your online behavior on our website.
        </Description>
        <Title>Why We Collect Your Data</Title>
        <Description>
          We are collecting your data for several reasons: -To better understand your needs. -To
          improve our services and products. -To customize our website according to your online
          behavior and personal preferences.
        </Description>
        <Title>Safeguarding and Securing the Data</Title>
        <Description>
          Mission Critical Protocols is committed to securing your data and keeping it confidential.
          Mission Critical Protocols has done all in its power to prevent data theft, unauthorized
          access, and disclosure by implementing the latest technologies and software, which help us
          safeguard all the information we collect online.
        </Description>
        <Title>Our Cookie Policy</Title>
        <Description>
          Once you agree to allow our website to use cookies, you also agree to use the data it
          collects regarding your online behavior (analyze web traffic, web pages you spend the most
          time on, and websites you visit). The data we collect by using cookies is used to
          customize our website to your needs. After we use the data for statistical analysis, the
          data is completely removed from our systems. Please note that cookies don't allow us to
          gain control of your computer in any way. They are strictly used to monitor which pages
          you find useful and which you do not so that we can provide a better experience for you.
          If you want to disable cookies, you can do it by accessing the settings of your internet
          browser. (Provide links for cookie settings for major internet browsers). Mission Critical
          Protocols will not lease, sell or distribute your personal information to any third
          parties, unless we have your permission. We might do so if the law forces us.
        </Description>
        <BackButton type="link" icon={<ArrowLeftOutlined />} size="large">
          <RouterLink to={'/home'}>Back Home</RouterLink>
        </BackButton>
      </CustomContent>
    </Root>
  )
}

export default Privacy
