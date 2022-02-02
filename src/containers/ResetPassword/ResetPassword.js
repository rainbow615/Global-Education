import { useSearchParams } from 'react-router-dom'

import CodeForm from './CodeForm'
import NewPasswordForm from './NewPasswordForm'
import { Root } from './styles'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()

  const step = searchParams.get('step') || 'code'

  return (
    <Root>
      {step === 'code' && <CodeForm />}
      {step === 'new-password' && <NewPasswordForm />}
    </Root>
  )
}

export default ResetPassword
