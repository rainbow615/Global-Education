import styled from 'styled-components'
import { Menu, Modal } from 'antd'

export const AddMenu = styled(Menu)`
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

export const ModalContainer = styled(Modal)`
  .ant-modal-close {
    left: 0;
    right: auto;
  }
`

export const ModalHeader = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const ScrollView = styled.div`
  width: 100%;
  height: 250px;
  overflow-y: auto;
  padding: 10px 10px 10px 0;
  margin-top: 20px;
  border: 1px solid ${(props) => props.theme.palette.borderColor};

  .ant-menu {
    border: 0;

    .ant-menu-item {
      height: 25px;
      line-height: 25px;
    }
  }
`

export const HTMLViewer = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  &.popup-item {
    max-width: 245px;
    overflow: hidden;
  }
`

export const EmptyText = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.palette.disabledText};
  font-style: italic;
`
