import styled from 'styled-components'
import { Container } from '../../../components/CommonComponent'

export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Root = styled(Container)`
  justify-content: flex-start;
`

export const Section = styled.div`
  flex: 1;
  max-width: calc(50% - 20px);
`

export const HTMLViewer = styled.div`
  margin-top: 10px;
  min-height: 300px;
  background-color: white;
  padding: 30px 20px;
  border: 1px solid ${(props) => props.theme.palette.borderColor};
`
