import styled from 'styled-components'
import { Input, Table, Modal, Form, Button } from 'antd'

const { Search } = Input

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 40px;
  gap: 1.5rem;
`

export const LinkButton = styled.div`
  margin-bottom: 3px;
  text-align: ${(props) => (props.align ? props.align : 'left')};

  button {
    padding: 0;
  }

  a,
  button {
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
  .ant-table-cell {
    padding: 0.25rem;
    &:first-of-type {
      padding-left: 0.75rem;
    }
  }
`

export const CustomTableHeader = styled.div`
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

export const CustomSearchText = styled(Search)`
  width: 200px;
`

export const FormActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  flex-wrap: wrap;
  gap: 1.5rem;

  button {
    min-width: 100px;

    &.published,
    &.published[disabled]:hover {
      background: #389e0d22;
      border: 0;
      color: #389e0d55;
      border-left: 4px solid;
    }
  }
`

export const SwitchFormItem = styled(Form.Item)({
  '&.ant-form-item': {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'nowrap',
  },
  '& .ant-form-item-label': {
    padding: 0,
  },
})

export const DateText = styled.div`
  text-align: center;
  font-size: 0.8rem;
`

export const CustomModal = styled(Modal)`
  form {
    margin-top: 30px;

    h3 {
      text-align: center;
      margin-bottom: 35px;
    }

    .bottom-actions {
      text-align: right;
      margin-top: 45px;
      margin-bottom: 0;

      button {
        min-width: 80px;
      }
    }
  }
`
