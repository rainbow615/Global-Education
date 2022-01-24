import { Typography, Space, Row, Col } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'

import PasswordForm from './PasswordForm'
import ConfirmCodeForm from './ConfirmCodeForm'

import GoogleStorePng from '../../assets/img/google-store.png'
import AppStorePng from '../../assets/img/app-store.png'
import { Root, AppStoreContainer } from './styles'

const { Title, Text } = Typography

const Login = () => {
  const [searchParams] = useSearchParams()
  const step = searchParams.get('step') || 'password'

  return (
    <Root>
      <Title>Login</Title>

      {step === 'password' && <PasswordForm />}
      {step === 'confirm-code' && <ConfirmCodeForm />}

      <Space direction="vertical">
        <Link to="/home#request-access">Request Access</Link>
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/home">Back to Home</Link>
      </Space>

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
    </Root>
  )
}

export default Login
