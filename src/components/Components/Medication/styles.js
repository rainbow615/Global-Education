import styled from 'styled-components'
import { Space } from 'antd'

export const DoseSection = styled(Space)`
  width: 100%;
  background: rgb(255, 0, 0, 0.05);
  padding: 0.75rem 1rem 1rem;
  flex-direction: column;

  > .ant-space-item {
    flex: 1;
  }

  .ant-select {
    min-width: 135px;
  }

  .ant-form-item {
    margin-bottom: 0;
  }
`
