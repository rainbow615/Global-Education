import styled from 'styled-components'
import { Menu } from 'antd'

export const BodyMenu = styled(Menu)`
  min-width: 220px;
  border: 0;

  .ant-menu-item {
    margin: 0 !important;
    border: 1px solid ${(props) => props.theme.palette.borderColor};

    .ant-menu-title-content {
      display: flex;
      justify-content: space-between;

      .short-key {
        color: ${(props) => props.theme.palette.disabledText};
        font-size: 0.8rem;
      }
    }
  }
`
