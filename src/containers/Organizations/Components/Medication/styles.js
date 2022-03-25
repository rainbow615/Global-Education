import styled from 'styled-components'
import { Space } from 'antd'

export const Root = styled.div``

export const DoseSection = styled(Space)`
  width: 100%;

  > .ant-space-item {
    flex: 1;
  }

  .ant-select {
    min-width: 100px;
  }

  .ant-form-item {
    margin-bottom: 0;
  }
`
