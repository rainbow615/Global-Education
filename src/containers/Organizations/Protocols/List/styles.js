import styled from 'styled-components'
import { Button } from 'antd'

export const TagContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',
  '*': {
    margin: 0,
  },
})

export const ActionButton = styled(Button)`
  width: 50px;
  padding: 0.25rem;
`
