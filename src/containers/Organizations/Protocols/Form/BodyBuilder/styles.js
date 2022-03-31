import styled from 'styled-components'
import { Menu, Space } from 'antd'

export const Root = styled(Space)`
  width: 100%;
`

export const BodyMenu = styled(Menu)`
  min-width: 220px;
  border: 0;

  .ant-menu-item {
    margin: 0 !important;
    border: 1px solid ${(props) => props.theme.palette.borderColor};

    .ant-menu-title-content {
      display: flex;
      justify-content: space-between;

      .short-key {
        color: ${(props) => props.theme.palette.disabledText};
        font-size: 0.8rem;
      }
    }
  }
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
