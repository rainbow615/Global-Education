import styled from 'styled-components'

export const ComponentsListView = styled.div`
  margin-top: 16px;
`

export const SubComponentRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px 10px 55px;
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

