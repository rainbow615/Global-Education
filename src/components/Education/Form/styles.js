import styled from 'styled-components'
import { Container } from '../../../components/CommonComponent'

export const Root = styled(Container)`
  max-width: 800px;

  form {
    width: 100%;

    .desc-wrapper {
      border: 1px solid ${(props) => props.theme.palette.borderColor};

      .rdw-editor-toolbar {
        margin: 0;
      }

      .desc-editor {
        background: white;
        padding: 10px;
        min-height: 200px;
      }
    }
  }
`
