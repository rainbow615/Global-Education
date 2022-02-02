import { useSearchParams } from 'react-router-dom'

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
    </Root>
  )
}

export default ForgotPassword
