import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

import { updateEducation, deleteEducation, useEducation } from '../../../services/jitService'
import { JIT_ACTIONS, JIT_CONFIRM_MSG } from '../../../config/constants'
import CustomBreadcrumb from '../../CustomBreadcrumb/CustomBreadcrumb'
import CustomLoading from '../../Loading/Loading'
import { FormActionButtons } from '../../CommonComponent'
import { ResultFailed } from '../../ResultPages'
import ConfirmActionButton from '../../ConfirmActionButton'
import { formatLocalizedDate, formatHTMLForDiff } from '../../../utils'

import { Root, Topbar, TitleView } from './styles'

const compareStyles = {
  variables: {
    light: {
      codeFoldGutterBackground: '#6F767E',
      codeFoldBackground: '#E2E4E5',
      diffViewerTitleBackground: '#f0f2f5',
      diffViewerTitleColor: '#1f2532',
    },
  },
}

const ChangeReview = (props) => {
  const { breadCrumb, isGlobal, orgId } = props
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const id = data?.id
  const title = data?.name || ''
  const content = data?.content || ''

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!data) {
      navigate(`/${prefixLink}education/list`, { state: { orgId } })
    }
  })

  const { data: parentJit, error } = useEducation(data?.parent_id || null)

  if (error) {
    return <ResultFailed isBackButton={false} />
  }

  if (parentJit?.isLoading) {
    return <CustomLoading />
  }

  const onSubmit = () => {
    let status = JIT_ACTIONS.APPROVED

    const payload = {
      organization_id: orgId || null,
      parent_id: data.parent_id,
      name: data.name,
      content: data.content,
      status,
    }

    setIsLoading(true)
    updateEducation(id, payload)
      .then(() => {
        setIsLoading(false)
        notification.success({
          message: `This JIT Education is ready to approve now!`,
        })
        navigate(`/${prefixLink}education/proof`, { state: { id, orgId, ...payload } })
      })
      .catch((error) => {
        setIsLoading(false)

        notification.error({
          message: 'Update Failure',
          description: error?.data || '',
        })
      })
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteEducation(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({ message: 'A JIT Education has been deleted successfully!' })
        navigate(`/${prefixLink}education/list`, { state: { orgId } })
      })
      .catch((error) => {
        setIsDeleting(false)

        notification.error({
          message: 'Delete Failure',
          description: error?.data || '',
        })
      })
  }

  const renderTitleBar = (title, subTitle) => (
    <TitleView>
      {title}
      <div className="sub-title">{subTitle}:</div>
    </TitleView>
  )

  const parentJitData = parentJit?.data && parentJit.data.length > 0 ? parentJit.data[0] : null

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        <Button type="link" icon={<RollbackOutlined />}>
          <RouterLink to={`/${prefixLink}education/form/edit`} state={data}>
            &nbsp;Send Back to Editor
          </RouterLink>
        </Button>
      </Topbar>

      <Root>
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentJitData?.jit_name || '')}
          newValue={formatHTMLForDiff(title)}
          splitView={!!parentJitData?.modified_date}
          compareMethod={DiffMethod.WORDS}
          showDiffOnly={false}
          styles={compareStyles}
          leftTitle={
            parentJitData?.modified_date
              ? renderTitleBar(
                  `Last published ${formatLocalizedDate(
                    parentJitData.modified_date,
                    'MM/DD/YYYY'
                  )}`,
                  'Title'
                )
              : renderTitleBar('Current draft', 'Title')
          }
          rightTitle={renderTitleBar('Current draft', 'Title')}
        />
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentJitData?.jit_content || '')}
          newValue={formatHTMLForDiff(content)}
          splitView={!!parentJitData?.modified_date}
          compareMethod={DiffMethod.WORDS}
          showDiffOnly={false}
          styles={compareStyles}
          leftTitle={renderTitleBar('', 'Body')}
          rightTitle={renderTitleBar('', 'Body')}
        />
      </Root>
      <FormActionButtons>
        <ConfirmActionButton
          type="link"
          size="large"
          danger
          loading={isDeleting}
          onClick={onDelete}
          actionType={JIT_ACTIONS.DELETE}
          message={JIT_CONFIRM_MSG.DELETE}
        >
          Delete
        </ConfirmActionButton>
        <Space>
          <Button size="large">
            <RouterLink to={`/${prefixLink}education/list`} state={{ orgId }}>
              Close
            </RouterLink>
          </Button>
          <Button size="large" onClick={onSubmit} loading={isLoading}>
            Accept Changes
          </Button>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default ChangeReview
