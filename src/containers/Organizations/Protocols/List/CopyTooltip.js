import { useCallback, useState } from 'react'
import { Space } from 'antd'

import { useProtocol } from '../../../../services/protocolService'
import CustomLoading from '../../../../components/Loading/Loading'
import { ResultFailed } from '../../../../components/ResultPages'
import CustomTooltip from '../../../../components/CustomTooltip'
import { PROTOCOL_ACTIONS } from '../../../../config/constants'

const CopyTooltip = ({ value, record }) => {
  let tipMessage = <CustomLoading />
  const isCopied =
    record.parent_id &&
    (record.status === PROTOCOL_ACTIONS.DRAFT ||
      record.status === PROTOCOL_ACTIONS.INREVIEW ||
      record.status === PROTOCOL_ACTIONS.APPROVED)

  const [isShowTooltip, setIsShowTooltip] = useState(false)

  const { data: parentProtocol, error } = useProtocol((isShowTooltip && record?.parent_id) || null)

  if (error) {
    tipMessage = <ResultFailed isBackButton={false} />
  }

  if (!parentProtocol?.isLoading && parentProtocol?.data) {
    const parentData = parentProtocol.data
    tipMessage = `This protocol is a copy of "${parentData.protocol_number}: ${parentData.protocol_name}" and will replace that protocol when published.`
  }

  const onVisible = useCallback((isShow) => {
    setIsShowTooltip(isShow)
  }, [])

  return (
    <Space align="center">
      {value}
      {isCopied && <CustomTooltip label="Copy" title={tipMessage} onVisibleChange={onVisible} />}
    </Space>
  )
}

export default CopyTooltip
