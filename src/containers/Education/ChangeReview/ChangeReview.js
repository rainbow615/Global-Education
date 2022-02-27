import React, { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Button, Space, Typography, notification } from 'antd'
import { RollbackOutlined, CheckOutlined } from '@ant-design/icons'

import { updateEducation } from '../../../services/jitService'
import { PUBLISHED_STATE } from '../../../config/constants'
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

  const [isLoad, setIsLoad] = useState(false)
  const [jitStatus, setJitStatus] = useState(data.status)

  const onSubmit = () => {
    let status = PUBLISHED_STATE.UNPUBLISHED

    if (jitStatus !== PUBLISHED_STATE.PUBLISHED) {
      status = PUBLISHED_STATE.PUBLISHED
    }

    const payload = {
      organization_id: null,
      parent_id: null,
      name: data.name,
      content: data.content,
      status,
    }

    setIsLoad(true)
    updateEducation(data.id, payload)
      .then(() => {
        setIsLoad(false)
        setJitStatus(status)
        notification.success({
          message: `A JIT Education has been ${
            status === PUBLISHED_STATE.PUBLISHED ? 'published' : 'unpublished'
          } successfully!`,
        })
      })
      .catch((error) => {
        setIsLoad(false)

        notification.error({
          message: 'Upate Failure',
          description: error?.data || '',
        })
      })
  }

  const isPublish = jitStatus === PUBLISHED_STATE.PUBLISHED

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        <Button type="link" icon={<RollbackOutlined />}>
          <RouterLink to="/education/form/edit" state={data}>
            &nbsp;Send Back to Editor
          </RouterLink>
        </Button>
      </Topbar>

      <Root>
        <Section>
          <Text>Current draft</Text>
          <HTMLViewer className="wyswyg-editor" dangerouslySetInnerHTML={{ __html: content }} />
        </Section>
      </Root>
      <FormActionButtons>
        {isPublish && (
          <Button type="link" size="large" danger onClick={onSubmit} loading={isPublish && isLoad}>
            {isPublish ? 'Unpublish' : 'Delete'}
          </Button>
        )}
        {!isPublish && (
          <Button type="link" size="large" danger>
            Delete
          </Button>
        )}
        <Space>
          {isPublish && (
            <Button size="large">
              <RouterLink to="/education/form/edit" state={data}>
                Update
              </RouterLink>
            </Button>
          )}
          <Button size="large">
            <RouterLink to="/education/list">Close</RouterLink>
          </Button>
          <Button
            size="large"
            className={isPublish ? 'published' : ''}
            icon={isPublish ? <CheckOutlined /> : null}
            onClick={onSubmit}
            loading={!isPublish && isLoad}
            disabled={isPublish}
          >
            Publish
          </Button>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default ChangeReview
