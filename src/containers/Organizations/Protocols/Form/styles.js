import styled from 'styled-components'
import { Button, Space } from 'antd'

import { Container } from '../../../../components/CommonComponent'

export const Root = styled(Container)`
  max-width: 800px;

  form {
    width: 100%;

    .number,
    .category,
    .tags {
      display: inline-block;
    }

    .number {
        width: 100px;
    }

    .category,
    .tags {
      width: calc(50% - 70px);
      margin-left: 20px;
    }
  }
`

export const Topbar = styled(Space)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AddNewTeamButton = styled(Button)`
  width: 100%;
  border: 0px;
  text-align: left;
  padding-left: 0;
`
