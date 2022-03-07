import { useCallback, useEffect, useState } from 'react'
import { Space, Tooltip } from 'antd'

import { useEducation } from '../../../services/jitService'
import CustomLoading from '../../../components/Loading/Loading'
import { ResultFailed } from '../../../components/ResultPages'
import ColorTheme from '../../../theme/theme'
import { JIT_ACTIONS } from '../../../config/constants'
import { CopyLabel } from './styles'

const CopyTooltip = ({ value, record }) => {
  let tipMessage = <CustomLoading />
  const isCopied =
    record.parent_id &&
    (record.status === JIT_ACTIONS.DRAFT ||
      record.status === JIT_ACTIONS.INREVIEW ||
      record.status === JIT_ACTIONS.APPROVED)

  const [isShowTooltip, setIsShowTooltip] = useState(false)

  const { data: parentJit, error } = useEducation((isShowTooltip && record?.parent_id) || null)

  if (error) {
    tipMessage = <ResultFailed isBackButton={false} />
  }

  console.log('=', parentJit?.isLoading, parentJit?.data)

  if (!parentJit?.isLoading && parentJit?.data && parentJit.data.length > 0) {
    const parentJitData = parentJit.data[0]
    tipMessage = `This document is a copy of "${parentJitData.document_number}: ${parentJitData.jit_name}" and will replace that document when published.`
    console.log('======================')
  }

  const onVisible = useCallback((isShow) => {
    setIsShowTooltip(isShow)
  }, [])

  return (
    <Space align="center">
      {value}
      {isCopied && (
        <Tooltip
          title={tipMessage}
          color="white"
          overlayInnerStyle={{ color: ColorTheme.palette.textColor, minWidth: 234, minHeight: 66 }}
          onVisibleChange={onVisible}
        >
          <CopyLabel color="red">Copy</CopyLabel>
        </Tooltip>
      )}
    </Space>
  )
}

export default CopyTooltip
