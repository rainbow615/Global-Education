import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

import { updateEducation, deleteEducation, useEducation } from '../../../services/jitService'
import { DIFF_VIEW_STYLES, JIT_ACTIONS, JIT_CONFIRM_MSG } from '../../../config/constants'
import CustomBreadcrumb from '../../CustomBreadcrumb/CustomBreadcrumb'
import CustomLoading from '../../Loading/Loading'
import { FormActionButtons } from '../../CommonComponent'
import { ResultFailed } from '../../ResultPages'
import ConfirmActionButton from '../../ConfirmActionButton'
import { formatLocalizedDate, formatHTMLForDiff } from '../../../utils'

import { Root, Topbar, TitleView } from './styles'

const ChangeReview = (props) => {
  const { breadCrumb, isGlobal, orgId } = props
  const prefixLink = isGlobal ? 'global-' : 'organizations/local-'
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const jit_id = data?.jit_id
  const title = data?.jit_name || ''
  const content = data?.jit_content || ''

  const [isLoading, setIsLoading] = useState({ isNext: false, isBack: false })
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

  const onSubmit = (isNext) => () => {
    setIsLoading({ isNext, isBack: !isNext })

    const payload = {
      organization_id: orgId || null,
      parent_id: data.parent_id,
      jit_name: data.jit_name,
      jit_content: data.jit_content,
      status: isNext ? JIT_ACTIONS.APPROVED : JIT_ACTIONS.DRAFT,
    }

    console.log('======data', data)

    updateEducation(jit_id, payload)
      .then(() => {
        setIsLoading({ isNext: false, isBack: false })
        if (isNext) {
          notification.success({
            message: `This education document is ready to approve!`,
          })
        }

        navigate(isNext ? `/${prefixLink}education/proof` : `/${prefixLink}education/form/edit`, {
          state: { jit_id, orgId, ...payload },
        })
      })
      .catch((error) => {
        setIsLoading({ isNext: false, isBack: false })

        notification.error({
          message: 'Update failed!',
          description: error?.data || '',
        })
      })
  }

  const onDelete = () => {
    setIsDeleting(true)

    deleteEducation(jit_id)
      .then(() => {
        setIsDeleting(false)
        notification.success({ message: 'Education document has been deleted successfully!' })
        navigate(`/${prefixLink}education/list`, { state: { orgId } })
      })
      .catch((error) => {
        setIsDeleting(false)

        notification.error({
          message: 'Delete failed!',
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

  console.log('======****=', title, content)

  return (
    <React.Fragment>
      <Topbar>
        <CustomBreadcrumb items={breadCrumb} />
        <Button
          size="large"
          type="link"
          icon={<RollbackOutlined />}
          onClick={onSubmit(false)}
          loading={isLoading.isBack}
        >
          &nbsp;Send Back to Editor
        </Button>
      </Topbar>

      <Root>
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentJitData?.jit_name || '')}
          newValue={formatHTMLForDiff(title)}
          splitView={!!parentJitData}
          compareMethod={DiffMethod.WORDS}
          showDiffOnly={false}
          styles={DIFF_VIEW_STYLES}
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
          splitView={!!parentJitData}
          compareMethod={DiffMethod.WORDS}
          showDiffOnly={false}
          styles={DIFF_VIEW_STYLES}
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
          <Button size="large" onClick={onSubmit(true)} loading={isLoading.isNext}>
            Accept Changes
          </Button>
        </Space>
      </FormActionButtons>
    </React.Fragment>
  )
}

export default ChangeReview
