import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, notification } from 'antd'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import _ from 'lodash'
import { RollbackOutlined } from '@ant-design/icons'

import { deleteProtocol, updateProtocol, useProtocol } from '../../../../services/protocolService'
import { useCategories } from '../../../../services/categoryService'
import CustomBreadcrumb from '../../../../components/CustomBreadcrumb/CustomBreadcrumb'
import CustomLoading from '../../../../components/Loading/Loading'
import { ResultFailed } from '../../../../components/ResultPages'
import { FormActionButtons } from '../../../../components/CommonComponent'
import ConfirmActionButton from '../../../../components/ConfirmActionButton'
import {
  DIFF_VIEW_STYLES,
  PROTOCOL_ACTIONS,
  PROTOCOLS_CONFIRM_MSG,
} from '../../../../config/constants'
import { formatLocalizedDate, formatHTMLForDiff } from '../../../../utils'
import { getProtocolsBodyContent } from '../../../../utils/protocols'
import { Root, Topbar, TitleView } from './styles'

const ChangeReview = (props) => {
  const { orgId, orgName } = props
  const location = useLocation()
  const navigate = useNavigate()
  const data = location?.state
  const title = data?.protocol_name || ''
  const id = data?.protocol_id

  const breadCrumb = [
    {
      title: 'Organizations',
      link: '/organizations/list',
    },
    {
      title: orgName,
      link: '/organizations/dashboard',
      state: { id: orgId, name: orgName },
    },
    {
      title: `Protocols`,
      link: '/organizations/protocols/list',
      state: { orgId, orgName },
    },
    {
      title,
    },
    {
      title: 'Review',
    },
  ]

  const [isLoading, setIsLoading] = useState({ isNext: false, isBack: false })
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!data) {
      navigate(`/organizations/protocols/list`, { state: { orgId, orgName } })
    }
  })

  const { data: parentProtocol, error: protocolError } = useProtocol(data?.parent_id || null)
  const { data: categories, error: categoryError } = useCategories(orgId)

  if (protocolError || categoryError) {
    return <ResultFailed isBackButton={false} />
  }

  if (parentProtocol?.isLoading || categories.isLoading) {
    return <CustomLoading />
  }

  const onSubmit = (isNext) => () => {
    setIsLoading({ isNext, isBack: !isNext })

    const payload = {
      organization_id: orgId,
      parent_id: data?.parent_id || null,
      protocol_name: data.protocol_name,
      protocol_number: data.protocol_number,
      category_id: data.category_id,
      tags: data.tags,
      status: isNext ? PROTOCOL_ACTIONS.APPROVED : PROTOCOL_ACTIONS.DRAFT,
      protocol_body: data.protocol_body,
    }

    updateProtocol(id, payload)
      .then((res) => {
        setIsLoading({ isNext: false, isBack: false })
        if (isNext) notification.success({ message: 'Protocol is ready to approve now!' })

        const resData = res?.data || {}
        navigate(isNext ? '/organizations/protocols/proof' : '/organizations/protocols/form/edit', {
          state: { orgId, orgName, ...resData },
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

    deleteProtocol(id)
      .then(() => {
        setIsDeleting(false)
        notification.success({
          message: `Protocol has been deleted successfully!`,
        })
        navigate('/organizations/protocols/list', { state: { orgId, orgName } })
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

  const parentProtocolData = parentProtocol?.data || null

  const parentCategory = _.find(categories.data, { category_id: parentProtocolData?.category_id })
  const childCategory = _.find(categories.data, { category_id: data.category_id })
  const protocolBody = getProtocolsBodyContent(data?.protocol_body?.components)
  const parentProtocolBody = getProtocolsBodyContent(parentProtocolData?.protocol_body?.components)

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
          &nbsp;Send Back to Build
        </Button>
      </Topbar>
      <Root>
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentProtocolData?.protocol_name || '')}
          newValue={formatHTMLForDiff(title)}
          splitView={!!parentProtocolData}
          compareMethod={DiffMethod.WORDS}
          showDiffOnly={false}
          styles={DIFF_VIEW_STYLES}
          leftTitle={
            parentProtocolData?.modified_date
              ? renderTitleBar(
                  `Last published ${formatLocalizedDate(
                    parentProtocolData.modified_date,
                    'MM/DD/YYYY'
                  )}`,
                  'Title'
                )
              : renderTitleBar('Current draft', 'Title')
          }
          rightTitle={renderTitleBar('Current draft', 'Title')}
        />
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentProtocolData?.protocol_number || '')}
          newValue={formatHTMLForDiff(data.protocol_number)}
          splitView={!!parentProtocolData}
          compareMethod={DiffMethod.CHARS}
          showDiffOnly={false}
          styles={DIFF_VIEW_STYLES}
          leftTitle={renderTitleBar('', 'Number')}
          rightTitle={renderTitleBar('', 'Number')}
        />
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentCategory?.category_name || '')}
          newValue={formatHTMLForDiff(childCategory.category_name)}
          splitView={!!parentProtocolData}
          compareMethod={DiffMethod.CHARS}
          showDiffOnly={false}
          styles={DIFF_VIEW_STYLES}
          leftTitle={renderTitleBar('', 'Category')}
          rightTitle={renderTitleBar('', 'Category')}
        />
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentProtocolData?.tags?.toString() || '')}
          newValue={formatHTMLForDiff(data.tags.toString())}
          splitView={!!parentProtocolData}
          compareMethod={DiffMethod.WORDS}
          showDiffOnly={false}
          styles={DIFF_VIEW_STYLES}
          leftTitle={renderTitleBar('', 'Tags')}
          rightTitle={renderTitleBar('', 'Tags')}
        />
        <ReactDiffViewer
          oldValue={formatHTMLForDiff(parentProtocolBody)}
          newValue={formatHTMLForDiff(protocolBody)}
          splitView={!!parentProtocolData}
          compareMethod={DiffMethod.WORDS}
          showDiffOnly={false}
          styles={DIFF_VIEW_STYLES}
          leftTitle={renderTitleBar('', 'Body')}
          rightTitle={renderTitleBar('', 'Body')}
        />
        <FormActionButtons>
          <ConfirmActionButton
            type="link"
            size="large"
            danger
            loading={isDeleting}
            onClick={onDelete}
            actionType={PROTOCOL_ACTIONS.DELETE}
            message={PROTOCOLS_CONFIRM_MSG.DELETE}
          >
            Delete
          </ConfirmActionButton>
          <Space>
            <Button size="large">
              <RouterLink to={`/organizations/protocols/list`} state={{ orgId, orgName }}>
                Close
              </RouterLink>
            </Button>
            <Button size="large" onClick={onSubmit(true)} loading={isLoading.isNext}>
              Accept Changes
            </Button>
          </Space>
        </FormActionButtons>
      </Root>
    </React.Fragment>
  )
}

export default ChangeReview
