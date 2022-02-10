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
  }
`

export const RegionsCard = styled.div`
  width: calc(50% - 10px);
  min-height: 250px;
  overflow-y: auto;
  background-color: white;
  float: right;

  .ant-list-items {
    height: 250px;
    padding: 20px;
  }
`
