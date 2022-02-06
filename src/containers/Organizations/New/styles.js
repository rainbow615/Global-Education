import styled from 'styled-components'
import {} from 'antd'

export const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 40px;
  max-width: 800px;

  form {
    width: 100%;

    .regions,
    .type {
      display: inline-block;
      width: calc(50% - 10px);
      margin: 0;

      &:last-child {
        margin-left: 20px;
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

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;

  button {
    width: 100px;
  }
`
