import styled from 'styled-components'
import { Card, Space } from 'antd'

import { Container } from '../../CommonComponent'

export const Root = styled(Container)`
  form {
    width: calc(100% - 5px);
    max-width: 600px;
  }
`

export const BottomSection = styled(Space)`
  width: 100%;
  align-items: flex-start;

  .ant-space-item {
    width: 100%;
    min-width: 240px;

    .ant-space,
    .ant-space-item {
      width: 100%;
    }
  }

  .ant-list-item {
    border: 0;
    padding-left: 0;
    padding-right: 0;
  }
`

export const ProtocolsView = styled(Card)`
  width: 100%;
  min-height: 265px;
  overflow-y: auto;
`

export const EducationsView = styled(Space)`
  flex-direction: column;
  min-height: 265px;

  .search-educations {
    width: 100%;
  }

  .ant-list {
    background-color: white;
    border: 1px solid ${(props) => props.theme.palette.borderColor};
    height: 217px;
    overflow-y: auto;
    padding: 24px;
  }
`
