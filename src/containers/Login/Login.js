import { Typography, Row, Col } from 'antd'
import { useSearchParams } from 'react-router-dom'

import PasswordForm from './PasswordForm'
import ConfirmCodeForm from './ConfirmCodeForm'
import AsyncImage from '../../components/AsyncImage'

import GoogleStorePng from '../../assets/img/google-store.png'
import AppStorePng from '../../assets/img/app-store.png'
import { Root, ImageSection, RightSection, AppStoreContainer } from './styles'

const { Title, Text } = Typography

const Login = () => {
  const [searchParams] = useSearchParams()
  const step = searchParams.get('step') || 'password'

  return (
    <Root>
      <ImageSection>
        <AsyncImage src="/img/home/landing-1.png" alt="Mission Critical" />
      </ImageSection>
      <RightSection>
        <Title>Login</Title>

        {step === 'password' && <PasswordForm />}
        {step === 'confirm-code' && <ConfirmCodeForm />}        

        <AppStoreContainer direction="vertical">
          <Text type="secondary">
            This page is for administrators, license holders, and bulk book orders only. For our
            content, download our app here:
          </Text>
          <Row gutter={24}>
            <Col span={12}>
              <a href="https://www.apple.com/store">
                <img src={AppStorePng} alt="App Store" />
              </a>
            </Col>
            <Col span={12}>
              <a href="https://play.google.com/store/apps;">
                <img src={GoogleStorePng} alt="Play Store" />
              </a>
            </Col>
          </Row>
        </AppStoreContainer>
      </RightSection>
    </Root>
  )
}

export default Login
