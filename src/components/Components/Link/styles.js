import styled from 'styled-components'

export const ProtocolView = styled.div`
  background: white;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 64px;
  padding: 20px;
  margin-top: 16px;
  border: 1px solid ${(props) => props.theme.palette.borderColor};

  button {
    display: none;
  }

  &:hover {
    button {
      display: block;
    }
  }
`

export const ModalContentView = styled.div`
  min-width: 320px;
  max-width: 320px;

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
  padding: 10px 0;
  margin-top: 20px;
  border: 1px solid ${(props) => props.theme.palette.borderColor};
`
