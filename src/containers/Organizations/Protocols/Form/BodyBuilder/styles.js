import styled from 'styled-components'
import { Space } from 'antd'

export const Root = styled(Space)`
  width: 100%;
`
export const ListSection = styled.div``

export const ListItem = styled.div`
  position: relative;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px 10px 32px;
  border: 1px solid #d9d9d9;

  .remove-button-wrap {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 20%;
    min-width: 100px;

    .remove-button {
      border: 0;
      margin-left: 5px;
      visibility: hidden;
    }

    &:hover {
      .remove-button {
        visibility: visible;
      }
    }
  }
`

export const HTMLViewer = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  &.popup-item {
    overflow: hidden;
  }
`
