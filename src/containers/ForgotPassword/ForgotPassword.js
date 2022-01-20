import { Link, useSearchParams } from "react-router-dom"

import EmailForm from "./EmailForm"
import Success from "./Success"

import './styles.scss'
import { Row } from "antd"

const ForgotPassword = () => {
  const [searchParams] = useSearchParams()

  const step = searchParams.get('step') || 'email'

  return (
    <div className="forgot-password">
      {step === 'email' && <EmailForm />}
      {step === 'success' && <Success />}

      <Row justify="space-between">
        <Link to="/login">Back to login</Link>
        <Link to="/home">Back to home</Link>
      </Row>
    </div>
  )
}

export default ForgotPassword
