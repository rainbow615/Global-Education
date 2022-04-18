import styled from 'styled-components'
import { Space } from 'antd'

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
  position: relative;
  display: flex;
  align-items: center;
  padding: 0px 30px 0px 45px;

  .remove-button-wrap {
    position: absolute;
    left: 0;
    width: 20%;
    min-width: 100px;
    height: 100%;

    .remove-button {
      visibility: hidden;
    }

    &:hover {
      .remove-button {
        visibility: visible;
      }
    }
  }
`
