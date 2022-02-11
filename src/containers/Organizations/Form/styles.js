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
