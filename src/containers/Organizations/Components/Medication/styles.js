import styled from 'styled-components'
import { Space } from 'antd'

export const Root = styled.div`
  .notes .wyswyg-editor {
    margin-top: -37px;
  }
`

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
