import styled from 'styled-components'
import { Card, List, Statistic } from 'antd'

export const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 40px;
`

export const LeftSection = styled.div`
  max-width: 370px;
  margin-bottom: 40px;
`

export const CustomStatistic = styled(Statistic)`
  margin-bottom: 30px;

  .ant-statistic-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ant-statistic-content {
    span {
      white-space: pre;
    }
  }

  .ant-tag {
    vertical-align: top;
    font-size: 11px;
    line-height: 16px;
  }

  button {
    font-size: 0.7rem;
  }
`

export const PaymentSection = styled(Card)`
  width: 100%;
  border-color: ${(props) => props.theme.palette.primary};

  .payment-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .section-label {
      font-size: 0.8rem;
      color: ${(props) => props.theme.palette.primary};
      margin-bottom: 5px;
    }

    .payment-label {
      opacity: 0.45;
    }

    button {
      font-size: 0.7rem;
    }
  }
`

export const PaymentList = styled(List)`
  margin-top: 15px;

  .ant-list-item-meta-title {
    font-size: 1rem;
    font-family: 'InterBold';
  }

  .ant-list-item-action {
    margin-left: 5px;

    button {
      font-size: 0.7rem;
    }
  }
`

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-label {
    font-size: 0.8rem;
    opacity: 0.45;
  }
`

export const OrgCard = styled(Card)`
  min-width: 320px;
  min-height: 250px;

  .ant-menu {
    border: 0;
  }
`
