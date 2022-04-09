import React from 'react'
import { Col, Row } from 'antd'
import { Link, scroller } from 'react-scroll'

import AsyncImage from '../../components/AsyncImage'
import { CONTACTS_TOPIC } from '../../config/constants'
import {
  TopBanner,
  Section,
  LeftSection,
  RightSection,
  Title,
  DetailedText,
  Description,
  Buttons,
  LinkButton,
  CheckList,
  CheckListItem,
} from './styles'
import GoogleStorePng from '../../assets/img/google-store.png'
import AppStorePng from '../../assets/img/app-store.png'
import CheckListItemIcon from './CheckListItemIcon'

const HomeMainContent = (props) => {
  const onGotoContact = (index) => () => {
    scroller.scrollTo('contacts', {
      duration: 500,
      delay: 0,
      spy: true,
      smooth: true,
    })
    props.onChangeTopic && props.onChangeTopic(CONTACTS_TOPIC[index].id)
  }

  return (
    <React.Fragment>
      <TopBanner name="app">
        <LeftSection>
          <Title>A mobile app built by paramedics for paramedics</Title>
          <DetailedText>
            EMS protocols in a highly accessible format with powerful tools and just-in-time
            education to elevate your practice.
          </DetailedText>
          <Row
            gutter={10}
            style={{
              marginTop: '2rem',
            }}
          >
            <Col
              span={12}
              align="flex-start"
              style={{
                maxWidth: '12rem',
              }}
            >
              <a href="https://www.apple.com/store">
                <img src={AppStorePng} alt="App Store" className="store-icon" />
              </a>
            </Col>
            <Col
              span={12}
              align="flex-start"
              style={{
                maxWidth: '12rem',
              }}
            >
              <a href="https://play.google.com/store/apps;">
                <img src={GoogleStorePng} alt="Play Store" className="store-icon" />
              </a>
            </Col>
          </Row>
        </LeftSection>
        <RightSection>
          <AsyncImage
            alt="MCP"
            src="/img/home/protocol-mockup.png"
            style={{
              maxWidth: '15rem',
              alignSelf: 'center',
            }}
          />
        </RightSection>
      </TopBanner>
      <Section name="book">
        <LeftSection>
          {/* <SubTitle>For front-line providers</SubTitle> */}
          <Title as="h2">Expertly-Crafted Protocol Books</Title>
          <Description>All of the protocols and education from the app in print.</Description>
          <CheckList>
            {/* @prettier-ignore */}
            <CheckListItem>
              <CheckListItemIcon />
              Easier on the eyes
            </CheckListItem>
            <CheckListItem>
              <CheckListItemIcon />
              Notes in the margins
            </CheckListItem>
            <CheckListItem>
              <CheckListItemIcon />
              No batteries required{' '}
            </CheckListItem>
            <CheckListItem>
              <CheckListItemIcon />
              Muscle memory to find things quickly
            </CheckListItem>
          </CheckList>
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
          <AsyncImage
            alt="Our Printed Books"
            src="/img/home/book-mockup.png"
            style={{ alignSelf: 'flex-end' }}
          />
        </RightSection>
      </Section>

      {/* <Section name="cms">
        <LeftSection>
          <Title>Our CMS</Title>
          <SubTitle>For department and company administrators</SubTitle>
          <Description>
            Looking for an easy system to create and publish your own protocols? Our protocol
            builder and content management system (CMS) was designed specifically to build, review,
            and ship protocols with ease.
          </Description>
          <DetailedText>
            Mission Critical Protocols offers an unparalleled content management system (CMS) for
            creating, reviewing, and distributing operational policies directly to first responder
            workforces. Administrators can focus on information accuracy and updates, while the CMS
            does the heavy lifting on version control, styling, mobile application updates, book
            creation, and workforce notifications.
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
            Give an entire team, department, company, or region access to a Mission Critical
            Protocols application.
          </Description>
          <DetailedText>
            Mission Critical Protocols offers highly-customizable licenses that allow organizations
            to immediately improve their workforce's access to their operational information.
            Licenses can be utilized for small teams, an entire region, and everything in between.
            Once a license is established and in-use, license administrators get key insights to
            workforce utilization and other powerful functionalities.
          </DetailedText>
          <Buttons>
            <Button size="large" type="primary" onClick={onGotoContact(2)}>
              Request a License
            </Button>
          </Buttons>
        </LeftSection>
        <RightSection>
          <img alt="MCP" src="/img/home/landing-5.png" />
        </RightSection>
      </Section> */}
    </React.Fragment>
  )
}

export default HomeMainContent
