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
          <Title>Empowering first responders with accessible, mission-critical information.</Title>
          <DetailedText>
            EMTs, paramedics, firefighters, and police officers deliver essential services to society.
            Mission Critical Protocols gives these providers the operational information they need to care
            for our communities.
          </DetailedText>
          <Button type="primary" size="large">
            Learn more
          </Button>
        </LeftSection>
        <RightSection>
          <img
            alt="MCP"
            src="/img/home/landing-1.png"
          />
        </RightSection>
      </TopBanner>
      <Section name="app">
        <LeftSection>
          <Title>Our Mobile Applications</Title>
          <SubTitle>For front-line providers</SubTitle>
          <Description>
            First responder policies in highly-accessible mobile applications. Integrated tools and education. 
            Clear updates when policies change. 
          </Description>
          <DetailedText>
            Mission Critical Protocols delivers first-in-class quality applications that display first responders
            operation policies in a high-quality, mobile-friendly styling. We integrate calculators, references, 
            and education directly into those policies in a non-disruptive, helpful way. We also keep first responders
            updated on any policy changes down to a letter.
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
            src="/img/home/landing-2.png"
          />
        </RightSection>
      </Section>
      <Section name="book">
        <LeftSection>
          <Title>Our Printed Books</Title>
          <SubTitle>For front-line providers</SubTitle>
          <Description>
            First responder policies in expertly-crafted, printed books. Updates from our mobile application
            keep them up to date.
          </Description>
          <DetailedText>
          Mission Critical Protocols offers printed reference books that mirror the policy sets of our
          mobile application—integrated tools and eduation included. After a book is printed, the respective 
          mobile application will keep providers updated on any changes to the book.
          </DetailedText>
          <Buttons>
            <LinkButton>
              <Link to="app" spy={true} smooth={true} duration={500}>
                Order through our app!
              </Link>
            </LinkButton>
            <LinkButton onClick={onGotoContact(0)}>Want to order in bulk?</LinkButton>
          </Buttons>
        </LeftSection>
        <RightSection>
          <img alt="MCP" src="/img/home/landing-3.png" />
        </RightSection>
      </Section>
      <Section name="protocol">
        <LeftSection>
          <Title>Our CMS</Title>
          <SubTitle>For department and company administrators</SubTitle>
          <Description>
            Looking for an easy system to create and publish your own protocols? Our
            protocol builder and content management system (CMS) was designed specifically to build, 
            review, and ship protocols with ease.
          </Description>
          <DetailedText>
            Mission Critical Protocols offers an unparalleled content management system (CMS) for creating, reviewing,
            and distributing operational policies directly to first responder workforces. Administrators can focus
            on information accuracy and updates, while the CMS does the heavy lifting on version control, styling,
            mobile application updates, book creation, and workforce notifications.
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
          <img alt="MCP" src="/img/home/landing-4.png" />
        </RightSection>
      </Section>
      <Section name="licensing">
        <LeftSection>
          <Title>Our Licenses</Title>
          <SubTitle>For departments, companies, and governments</SubTitle>
          <Description>
            Give an entire team, department, company, or region access to a Mission Critical Protocols application.
          </Description>
          <DetailedText>
            Mission Critical Protocols offers highly-customizable licenses that allow organizations to immediately improve
            their workforce's access to their operational information. Licenses can be utilized for small teams, an 
            entire region, and everything in between. Once a license is established and in-use, license administrators get key 
            insights to workforce utilization and other powerful functionalities.
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
            src="/img/home/landing-5.png"
          />
        </RightSection>
      </Section>
    </React.Fragment>
  )
}

export default HomeMainContent
