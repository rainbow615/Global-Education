import React from 'react'
import { Button, Col, Row } from 'antd'
import { Link, scroller } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'

import { ContactsTopic } from '../../config/constants'
import GoogleStorePng from '../../assets/img/google-store.png'
import AppStorePng from '../../assets/img/app-store.png'
import {
  TopBanner,
  Section,
  LeftSection,
  RightSection,
  Title,
  SubTitle,
  DetailedText,
  Description,
  Buttons,
  LinkButton,
} from './styles'

const HomeMainContent = (props) => {
  const onGotoContact = (index) => () => {
    scroller.scrollTo('contacts', {
      duration: 500,
      delay: 0,
      spy: true,
      smooth: true,
    })
    props.onChangeTopic && props.onChangeTopic(ContactsTopic[index].id)
  }

  return (
    <React.Fragment>
      <TopBanner>
        <LeftSection>
          <Title>Enabling first responders with accessible, mission critical information.</Title>
          <DetailedText>
            Lorem Ipsum is probably the most popular dummy text generator out there. When analyzing
            a website template or theme, you probably saw the Latin filler text that gave structure
            to the page. This was almost certainly generated with Lorem Ipsum or a similar tool. It
            is a simple dummy text generator where you can specify how many words of filler text you
            need. You can download Lorem Ipsum as an add-on for Firefox, which is quite convenient
            for web designers.
          </DetailedText>
          <Button type="primary" size="large">
            Learn more
          </Button>
        </LeftSection>
        <RightSection>
          <img
            alt="MCP"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </RightSection>
      </TopBanner>
      <Section name="app">
        <LeftSection>
          <Title>App</Title>
          <SubTitle>For first responders, students, and educators</SubTitle>
          <Description>
            A searchable fully offline library of all protocols together with JIT training,
            beautifully organized and displayed. No more of PDF pinching.
          </Description>
          <DetailedText>
            Lorem Ipsum is probably the most popular dummy text generator out there. When analyzing
            a website template or theme, you probably saw the Latin filler text that gave structure
            to the page. This was almost certainly generated with Lorem Ipsum or a similar tool. It
            is a simple dummy text generator where you can specify how many words of filler text you
            need. You can download Lorem Ipsum as an add-on for Firefox, which is quite convenient
            for web designers.
          </DetailedText>
          <br />
          <Row gutter={24}>
            <Col span={12} align="center">
              <a href="https://www.apple.com/store">
                <img src={AppStorePng} alt="App Store" width={200} />
              </a>
            </Col>
            <Col span={12} align="center">
              <a href="https://play.google.com/store/apps;">
                <img src={GoogleStorePng} alt="Play Store" width={200} />
              </a>
            </Col>
          </Row>
        </LeftSection>
        <RightSection>
          <img
            alt="MCP"
            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
          />
        </RightSection>
      </Section>
      <Section name="book">
        <LeftSection>
          <Title>Book</Title>
          <SubTitle>For first responders, students, and educators</SubTitle>
          <Description>
            Get the same content in one convenient reference book that is easy to navigate. Build
            your muscle memory and stop caring about your battery levels.
          </Description>
          <DetailedText>
            Lorem Ipsum is probably the most popular dummy text generator out there. When analyzing
            a website template or theme, you probably saw the Latin filler text that gave structure
            to the page. This was almost certainly generated with Lorem Ipsum or a similar tool. It
            is a simple dummy text generator where you can specify how many words of filler text you
            need. You can download Lorem Ipsum as an add-on for Firefox, which is quite convenient
            for web designers.
          </DetailedText>
          <Buttons>
            <LinkButton>
              <Link to="app" spy={true} smooth={true} duration={500}>
                Use our app to order a copy
              </Link>
            </LinkButton>
            <LinkButton onClick={onGotoContact(0)}>Bulk orders</LinkButton>
          </Buttons>
        </LeftSection>
        <RightSection>
          <img alt="MCP" src="https://picsum.photos/500/600?grayscale" />
        </RightSection>
      </Section>
      <Section name="protocol">
        <LeftSection>
          <Title>Protocol Management</Title>
          <SubTitle>For EMS administrators</SubTitle>
          <Description>
            Looking for an easy system to create and publish your own protocols? Forget MS Word, our
            protocol builder was designed to build, review, and approve protocols with breeze.
          </Description>
          <DetailedText>
            Lorem Ipsum is probably the most popular dummy text generator out there. When analyzing
            a website template or theme, you probably saw the Latin filler text that gave structure
            to the page. This was almost certainly generated with Lorem Ipsum or a similar tool. It
            is a simple dummy text generator where you can specify how many words of filler text you
            need. You can download Lorem Ipsum as an add-on for Firefox, which is quite convenient
            for web designers.
          </DetailedText>
          <Buttons>
            <Button size="large" type="primary" ghost>
              <RouterLink to={'/login'}>Login</RouterLink>
            </Button>
            <Button size="large" type="primary" onClick={onGotoContact(1)}>
              Request Registration
            </Button>
          </Buttons>
        </LeftSection>
        <RightSection>
          <img alt="MCP" src="https://picsum.photos/seed/picsum/400/500" />
        </RightSection>
      </Section>
      <Section name="licensing">
        <LeftSection>
          <Title>Licensing</Title>
          <SubTitle>For EMS administrators</SubTitle>
          <Description>
            Give your whole team access to our protocol and educational library. Easier to manage,
            better pricing.
          </Description>
          <DetailedText>
            Lorem Ipsum is probably the most popular dummy text generator out there. When analyzing
            a website template or theme, you probably saw the Latin filler text that gave structure
            to the page. This was almost certainly generated with Lorem Ipsum or a similar tool. It
            is a simple dummy text generator where you can specify how many words of filler text you
            need. You can download Lorem Ipsum as an add-on for Firefox, which is quite convenient
            for web designers.
          </DetailedText>
          <Buttons>
            <Button size="large" type="primary" onClick={onGotoContact(2)}>
              Request a License
            </Button>
          </Buttons>
        </LeftSection>
        <RightSection>
          <img
            alt="MCP"
            src="https://www.altagasutilities.com/sites/default/files/2018-04/First%20Responders.jpg"
          />
        </RightSection>
      </Section>
    </React.Fragment>
  )
}

export default HomeMainContent
