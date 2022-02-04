import styled from 'styled-components'
import { Input, Menu } from 'antd'

const { Search } = Input

export const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 40px;
`

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  button {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const CustomSearch = styled(Search)`
  width: 200px;
`

export const DateText = styled.div`
  text-align: center;
  font-size: 0.7rem;
  opacity: 0.8;
`

export const ActionsMenu = styled(Menu)`
  width: 150px;

  li {
    padding: 8px 12px;

    span {
      text-align: center;
    }
  }
`
