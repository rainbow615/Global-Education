import { Link, useSearchParams } from 'react-router-dom'
import { Row } from 'antd'

import EmailForm from './EmailForm'
import Success from './Success'
import { Root } from './styles'

const ForgotPassword = () => {
  const [searchParams] = useSearchParams()

  const step = searchParams.get('step') || 'email'

  return (
    <Root>
      {step === 'email' && <EmailForm />}
      {step === 'success' && <Success />}

      <Row justify="space-between">
        <Link to="/login">Back to login</Link>
        <Link to="/home">Back to home</Link>
      </Row>
    </Root>
  )
}

export default ForgotPassword
