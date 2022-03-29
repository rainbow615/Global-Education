import { Tooltip } from 'antd'

import ColorTheme from '../../theme/theme'
import { CopyLabel } from './styles'

const CustomTooltip = (props) => {
  const { label, title, onVisibleChange } = props

  return (
    <Tooltip
      title={title}
      color="white"
      overlayInnerStyle={{
        color: ColorTheme.palette.textColor,
        minWidth: 234,
        minHeight: 66,
        padding: 15,
      }}
      onVisibleChange={onVisibleChange}
    >
      <CopyLabel color="red">{label}</CopyLabel>
    </Tooltip>
  )
}

export default CustomTooltip
