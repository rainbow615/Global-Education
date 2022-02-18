import styled from 'styled-components'
import { Button, Modal } from 'antd'

import { Container } from '../../../components/CommonComponent'

export const Root = styled(Container)`
  max-width: 800px;

  form {
    width: 100%;

    .email {
      width: 50%;
      margin: 0;
    }

    .firstname,
    .lastname {
      display: inline-block;
      width: calc(25% - 10px);
      margin: 0;

      &:last-child {
        margin-left: 20px;
      }
    }

    .search-teams {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`

export const RowSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > div {
    width: 50%;

    &:last-child {
      width: calc(50% - 30px);
    }
  }

  .access-table .ant-table {
    height: 250px;
  }
`

export const RegionsCard = styled.div`
  min-height: 250px;
  overflow-y: auto;
  background-color: white;

  .ant-list-items {
    height: 250px;
    padding: 20px;
  }
`

export const RowSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  margin-bottom: 10px;
`

export const AddNewTeamButton = styled(Button)`
  width: 100%;
  border: 0px;
  text-align: left;
  padding-left: 0;
`

export const AddNewModal = styled(Modal)`
  form {
    margin-top: 30px;

    h3 {
      text-align: center;
    }

    div {
      margin-top: 0;
    }

    .ant-form-item {
      margin-top: 35px;
    }
  }
`
