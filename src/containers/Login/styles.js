import styled from 'styled-components'
import { Space } from 'antd'

export const Root = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex: 1;
`

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const RightSection = styled.div`
  width: 480px;
  height: 100%;
  padding: 3rem;
  border-left: 1px solid grey;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const LoginFormContainer = styled.div`
  flex: 1;
`

export const AppStoreContainer = styled(Space)`
  img {
    width: 100%;
  }
`

export const ConfirmLabel = styled.div`
  font-size: 1.3rem;
  padding-bottom: 25px;
`

export const LinkButton = styled.div`
  margin-bottom: 3px;

  a {
    font-size: 0.9rem;
    padding: 5px 0;
    color: ${(props) => props.theme.palette.primary};
    border-bottom: 1px solid ${(props) => props.theme.palette.primary};

    &:hover {
      border-bottom-color: transparent;
      opacity: 0.8;
    }
  }
`
