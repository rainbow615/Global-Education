import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Button, Space, Typography } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'

import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import { FormActionButtons } from '../../../components/CommonComponent'

import { Root, Topbar, Section, HTMLViewer } from './styles'

const { Text } = Typography

const ChangeReview = () => {
  const location = useLocation()
  const data = location?.state
  const title = data?.name || ''
  const content = data?.content || ''

  const breadCrumb = [
    {
      title: 'JIT Education',
      link: '/education',
    },
    {
      title: title,
      link: '/education/form/edit',
      state: data,
    },
    {
      title: 'Change Review',
    },
  ]

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        <Button type="link" icon={<RollbackOutlined />}>
          <RouterLink to="/education/form/edit">&nbsp;Send Back to Editor</RouterLink>
        </Button>
      </Topbar>

      <Root>
        <Section>
          <Text>Current draft</Text>
          <HTMLViewer className="wyswyg-editor" dangerouslySetInnerHTML={{ __html: content }} />
        </Section>
      </Root>
      <FormActionButtons>
        <Button type="link" size="large" danger>
          Revert all changes
        </Button>
        <Space>
          <Button size="large" htmlType="submit">
            Approve Change
          </Button>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default ChangeReview
