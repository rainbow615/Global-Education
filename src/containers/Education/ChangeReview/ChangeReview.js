import React, { useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

import { updateEducation, deleteEducation, useEducation } from '../../../services/jitService'
import { JIT_ACTIONS, JIT_CONFIRM_MSG } from '../../../config/constants'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/CustomBreadcrumb'
import CustomLoading from '../../../components/Loading/Loading'
import { FormActionButtons } from '../../../components/CommonComponent'
import { ResultFailed } from '../../../components/ResultPages'
import ConfirmActionButton from '../../../components/ConfirmActionButton'
import { formatLocalizedDate, formatHTMLForDiff } from '../../../utils'

import { Root, Topbar } from './styles'

const compareStyles = {
  variables: {
    light: {
      codeFoldGutterBackground: '#6F767E',
      codeFoldBackground: '#E2E4E5',
    },
  },
}

const ChangeReview = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const id = data.id
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
  const [isDelete, setIsDelete] = useState(false)

  const { data: parentJit, error } = useEducation(data.parent_id || null)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (parentJit?.isLoading) {
    return <CustomLoading />
  }

  const onSubmit = () => {
    let status = JIT_ACTIONS.APPROVED

    const payload = {
      organization_id: null,
      parent_id: null,
      name: data.name,
      content: data.content,
      status,
    }

    setIsLoad(true)
    updateEducation(id, payload)
      .then(() => {
        setIsLoad(false)
        notification.success({
          message: `This JIT Education is ready to approve now!`,
        })
        navigate('/education/proof', { state: { id, ...payload } })
      })
      .catch((error) => {
        setIsLoad(false)

        notification.error({
          message: 'Upate Failure',
          description: error?.data || '',
        })
      })
  }

  const onDelete = () => {
    setIsDelete(true)

    deleteEducation(id)
      .then(() => {
        setIsDelete(false)
        notification.success({ message: 'A JIT Education has been deleted successfully!' })
        navigate('/education/list')
      })
      .catch((error) => {
        setIsDelete(false)

        notification.error({
          message: 'Delete Failure',
          description: error?.data || '',
        })
      })
  }

  const parentJitData = parentJit?.data && parentJit.data.length > 0 ? parentJit.data[0] : null

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
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentJitData?.jit_content || '')}
          newValue={formatHTMLForDiff(content)}
          splitView={!!parentJitData?.modified_date}
          compareMethod={DiffMethod.WORDS}
          styles={compareStyles}
          leftTitle={
            parentJitData?.modified_date
              ? `Last published ${formatLocalizedDate(parentJitData.modified_date, 'MM/DD/YYYY')}`
              : 'Current draft'
          }
          rightTitle="Current draft"
        />
      </Root>
      <FormActionButtons>
        <ConfirmActionButton
          type="link"
          size="large"
          danger
          loading={isDelete}
          onClick={onDelete}
          actionType={JIT_ACTIONS.DELETE}
          message={JIT_CONFIRM_MSG.DELETE}
        >
          Delete
        </ConfirmActionButton>
        <Space>
          <Button size="large">
            <RouterLink to="/education/list">Close</RouterLink>
          </Button>
          <Button size="large" onClick={onSubmit} loading={isLoad}>
            Accept Changes
          </Button>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default ChangeReview
