import styled from 'styled-components'
import { Container } from '../../../components/CommonComponent'

export const Root = styled(Container)`
  max-width: 800px;

  form {
    width: 100%;

    .state,
    .region,
    .type {
      display: inline-block;
      width: calc(33.33% - 10px);
      margin: 0 0 0 15px;

      &:first-child {
        margin-left: 0;
      }
    }

    button.published {
      background: #389e0d22;
      border: 0;
      color: #389e0d55;
      border-left: 4px solid;
    }
  }
`

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
