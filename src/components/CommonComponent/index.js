import styled from 'styled-components'
import { Table } from 'antd'

export const LinkButton = styled.div`
  margin-bottom: 3px;
  text-align: ${(props) => (props.align ? props.align : 'left')};

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

export const CustomTable = styled(Table)`
  width: 100%;
`
