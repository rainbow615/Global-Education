import styled from 'styled-components'
import { Button } from 'antd'

export const Title = styled.h1`
  font-size: 1.5rem;
  font-family: 'InterBold';
`

export const Description = styled.p`
  font-size: 1.3rem;
  margin-top: 20px;
  margin-bottom: 40px;
`

export const BackButton = styled(Button)`
  padding-left: 0;
  margin-bottom: 30px;

  a,
  span {
    font-size: 1.3rem;
    font-family: 'InterBold';
    margin-right: 8px;
  }
`
