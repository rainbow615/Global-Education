import styled from 'styled-components'
import { Select } from 'antd'

export const SearchTypeBox = styled(Select)`
  min-width: 120px;
`
export const ContentCell = styled.div({
  lineHeight: 1.25,
  display: 'flex',
  alignContent: 'center',
  padding: '0.25rem',
  '*': {
    margin: 0,
  },
})
