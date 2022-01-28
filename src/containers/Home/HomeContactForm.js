import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'

import { ContactsTopic } from '../../config/constants'
import { Section, ContackSection, ContactSectionArea, Title, Description, Buttons } from './styles'

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

  useEffect(() => {
    formRef.current.setFieldsValue({
      topic: props.topic,
    })
  }, [formRef, props.topic])

  const onFinish = (values) => {
    setIsLoading(true)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Section name="contacts">
      <div>
        <Title style={{ paddingLeft: 20 }}>Contacts</Title>
        <ContackSection>
          <ContactSectionArea>
            <img alt="MCP" src="https://picsum.photos/seed/picsum/600/300" />
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
            >
              <Form.Item name="name" rules={nameRules}>
                <Input placeholder="Name" size="large" />
              </Form.Item>

              <Form.Item name="email" rules={emailRules}>
                <Input placeholder="Email" size="large" />
              </Form.Item>

              <Form.Item name="topic" rules={topicRules}>
                <Select placeholder="Topic" size="large" allowClear>
                  {ContactsTopic.map((topic) => (
                    <Option key={topic.id} value={topic.id}>
                      {topic.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Form.Item name="organization" rules={organizationRules} className="organization">
                  <Input placeholder="Organization" size="large" />
                </Form.Item>
                <Form.Item name="role" rules={roleRules} className="role">
                  <Input placeholder="Role" size="large" />
                </Form.Item>
              </Form.Item>

              <Form.Item name="message" rules={messageRules}>
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
          </ContactSectionArea>
        </ContackSection>
      </div>
    </Section>
  )
}

export default HomeContactForm
