import styled from 'styled-components'
import { Button } from 'antd'

import { Container, CustomModal } from '../../../components/CommonComponent'

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

export const AddNewTeamModalView = styled(CustomModal)`
  form {
    div {
      margin-top: 0;
    }
  }
`

export const AddNewRoleModalView = styled(CustomModal)`
  form {
    .organization,
    .role {
      display: inline-block;
      width: calc(50% - 10px);
      margin: 0;
    }

    .organization {
      margin-left: 20px;
    }
  }
`

export const ConfirmTextTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  span {
    &:last-child {
      font-size: 0.7rem;
      opacity: 0.8;
    }
  }
`
