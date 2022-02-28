import styled from 'styled-components'

export const ConfirmModalBody = styled.div`
  padding: 10px;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 1.2rem;

    .anticon-exclamation-circle {
      color: ${(props) => props.theme.palette.warning};
      font-size: 1.5rem;
      margin-right: 20px;
    }
  }

  .description {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 10px;
      min-width: 80px;
    }
  }
`
