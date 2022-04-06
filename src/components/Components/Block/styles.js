import styled from 'styled-components'

export const ComponentsListView = styled.div`
  margin-top: 16px;
`

export const SubComponentRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px 10px 45px;
  margin-bottom: 3px;
  border: 1px solid ${(props) => props.theme.palette.borderColor};
  cursor: pointer;

  .remove-button-wrap {
    position: absolute;
    left: 0;
    width: 20%;
    min-width: 100px;

    .remove-button {
      position: absolute;
      left: 10px;
      border: 0;
      visibility: hidden;
    }

    &:hover {
      .remove-button {
        visibility: visible;
      }
    }
  }

  .ant-space-item {
    min-height: 32px;
    display: flex;
    align-items: center;
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

export const ModalContentView = styled.div`
  min-width: 325px;
  max-width: 325px;

  .ant-input-search {
    width: 100%;
  }

  .ant-menu {
    border: 0;

    .ant-menu-item {
      height: 25px;
      line-height: 25px;
    }
  }
`

export const ScrollView = styled.div`
  width: 100%;
  height: 250px;
  overflow-y: auto;
  padding: 10px 10px 10px 0;
  margin-top: 20px;
  border: 1px solid #d9d9d9;
`

export const ModalHeader = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const ModalFooter = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`

export const EmptyText = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.palette.disabledText};
  font-style: italic;
`
