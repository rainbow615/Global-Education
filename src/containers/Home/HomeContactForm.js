import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, notification, Space } from 'antd'

import { ContactsTopic } from '../../config/constants'
import { Section, ContackSection, ContactSectionArea, Title, Description, Buttons } from './styles'
import { requestRegistration } from '../../services/authService'

const { Option } = Select

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
          message: 'Contact Failure',
          description: 'Sorry, the request failed. Please try again later.',
        })
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onDone = () => {
    setIsSubmit(false)
    formRef.current.resetFields()
  }

  return (
    <Section name="contacts">
      <Space direction="vertical">
        <Title style={{ paddingLeft: 20 }}>Contact Us</Title>
        <ContackSection>
          <ContactSectionArea>
            <img alt="MCP" src="/img/home/contact-form.png" />
            <Description>
              Looking for partnership, licenses, bulk orders, support? Use our form to submit an
              inquiry.
            </Description>
          </ContactSectionArea>
          <ContactSectionArea>
            <Form
              ref={formRef}
              autoComplete="off"
              initialValues={{}}
              layout="vertical"
              name="contacts"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
              style={{ display: isSubmit ? 'none' : 'block' }}
            >
              <Form.Item name="name" hasFeedback rules={nameRules}>
                <Input placeholder="Name" size="large" />
              </Form.Item>

              <Form.Item name="email" hasFeedback rules={emailRules}>
                <Input placeholder="Email" size="large" />
              </Form.Item>

              <Form.Item name="topic" hasFeedback rules={topicRules}>
                <Select placeholder="Topic" size="large" allowClear>
                  {ContactsTopic.map((topic) => (
                    <Option key={topic.id} value={topic.id}>
                      {topic.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Form.Item name="organization" hasFeedback rules={organizationRules} className="organization">
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
                <Buttons>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                  </Button>
                </Buttons>
              </Form.Item>
            </Form>
            {isSubmit && (
              <Space direction="vertical">
                <Title>Thank you for your message!</Title>
                <Description>We'll be in contact soon!</Description>
                <Buttons>
                  <Button type="primary" onClick={onDone}>
                    Done
                  </Button>
                </Buttons>
              </Space>
            )}
          </ContactSectionArea>
        </ContackSection>
      </Space>
    </Section>
  )
}

export default HomeContactForm
