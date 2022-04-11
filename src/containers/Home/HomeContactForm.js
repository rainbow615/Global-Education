import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, notification, Space } from 'antd'
import ReCAPTCHA from 'react-google-recaptcha'

import { CONTACTS_TOPIC } from '../../config/constants'
import {
  Section,
  ContactSection,
  ContactSectionArea,
  Title,
  Description,
  Buttons,
  ContactSuccessMessage,
  DetailedText,
  Img,
} from './styles'
import { requestRegistration } from '../../services/authService'
import CheckListItemIcon from './CheckListItemIcon'
import AsyncImage from '../../components/AsyncImage'

const { Option } = Select
const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY

const nameRules = [{ required: true, message: 'Please input your name' }]
const emailRules = [
  {
    required: true,
    message: 'Please input your email',
  },
  {
    type: 'email',
    message: 'Please input valid email',
  },
]
const topicRules = [{ required: true, message: 'Please select the topic type' }]
const organizationRules = [{ required: true, message: 'Please input Organization' }]
const roleRules = [{ required: true, message: 'Please input Role' }]
const messageRules = [{ required: true, message: 'Please input Message' }]

const HomeContactForm = (props) => {
  let formRef = React.createRef()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    formRef.current.setFieldsValue({
      topic: props.topic,
    })
  }, [formRef, props.topic])

  const onFinish = (values) => {
    setIsLoading(true)

    requestRegistration(values)
      .then((res) => {
        setIsLoading(false)
        setIsSubmit(true)
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Contact failed!',
          description: 'Sorry, the request failed. Please try again later.',
        })
      })
  }

  const onVerify = (value) => {
    if (value) {
      setIsVerified(true)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onDone = () => {
    setIsSubmit(false)
    formRef.current.resetFields()
  }

  return (
    <ContactSection name="contacts">
      <Title as="h2">Contact Us</Title>
      <DetailedText>
        Looking for partnership, licenses, bulk orders, support? Use our form to submit an inquiry.
      </DetailedText>
      <Form
        style={{ display: isSubmit ? 'none' : 'block' }}
        ref={formRef}
        autoComplete="off"
        initialValues={{}}
        layout="vertical"
        name="contacts"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Form.Item name="name" hasFeedback rules={nameRules}>
          <Input placeholder="Name" size="large" />
        </Form.Item>

        <Form.Item name="email" hasFeedback rules={emailRules}>
          <Input placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item name="topic" hasFeedback rules={topicRules}>
          <Select placeholder="Topic" size="large" allowClear>
            {CONTACTS_TOPIC.map((topic) => (
              <Option key={topic.id} value={topic.id}>
                {topic.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Form.Item
            name="organization"
            hasFeedback
            rules={organizationRules}
            className="organization"
          >
            <Input placeholder="Organization" size="large" />
          </Form.Item>
          <Form.Item name="role" hasFeedback rules={roleRules} className="role">
            <Input placeholder="Role" size="large" />
          </Form.Item>
        </Form.Item>
        <Form.Item name="message" hasFeedback rules={messageRules}>
          <Input.TextArea
            showCount
            maxLength={1000}
            rows="5"
            size="large"
            placeholder="Message..."
          />
        </Form.Item>
        <Form.Item>
          <Buttons justifyContent="space-between">
            <ReCAPTCHA sitekey={siteKey} onChange={onVerify} />
            <Button type="primary" htmlType="submit" disabled={!isVerified} loading={isLoading}>
              Submit
            </Button>
          </Buttons>
        </Form.Item>
      </Form>
      {isSubmit && (
        <ContactSuccessMessage>
          <Space
            direction="vertical"
            style={{
              marginTop: '2rem',
              minHeight: '35rem',
            }}
          >
            <CheckListItemIcon
              props={{
                width: '5rem',
                height: '5rem',
                color: '#00eeb3',
              }}
            />
            <DetailedText>Thank you for your message! We'll be in contact soon.</DetailedText>
            <Buttons justifyContent="center">
              <Button type="primary" onClick={onDone}>
                Done
              </Button>
            </Buttons>
          </Space>
        </ContactSuccessMessage>
      )}
    </ContactSection>
  )
}

export default HomeContactForm
