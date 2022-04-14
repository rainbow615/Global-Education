import styled from 'styled-components'
import { Menu, Space } from 'antd'

export const Root = styled(Space)`
  width: 100%;
`

export const ListSection = styled.div`
  width: 100%;

  .ant-space {
    width: 100%;
  }

  .ant-collapse-item {
    .ant-collapse-header {
      align-items: center;
    }
  }

  .ant-collapse-item-disabled .ant-collapse-header {
    cursor: auto;
    color: revert;
  }
`

export const PanelHeader = styled.div`
  padding-right: 30px;
`
