import { Link, useSearchParams } from 'react-router-dom'

import CodeForm from './CodeForm'
import NewPasswordForm from './NewPasswordForm'

import './styles.scss'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()

  const step = searchParams.get('step') || 'code'

  return (
    <div className="reset-password">
      {step === 'code' && <CodeForm />}
      {step === 'new-password' && <NewPasswordForm />}

      <Link to="/login">Back to login</Link>
      <Link to="/home">Back to home</Link>
    </div>
  )
}

export default ResetPassword
