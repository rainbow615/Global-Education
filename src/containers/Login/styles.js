import styled from 'styled-components'
import { Space } from 'antd'

export const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 100vh;
  padding: 3rem;
  border-left: 1px solid grey;

  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const AppStoreContainer = styled(Space)`
  margin-top: auto;

  img {
    width: 100%;
  }
`
