import styled from 'styled-components'
import { Descriptions, Statistic, Modal, Card } from 'antd'

export const LeftSection = styled.div`
  max-width: 370px;
  margin-bottom: 40px;
`

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

export const CustomDescriptions = styled(Descriptions)`
  margin-bottom: 30px;

  th {
    width: 50%;
  }

  span {
    color: ${(props) => props.theme.palette.disabledText};
  }
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
      white-space: pre-wrap;
    }
  }

  button {
    font-size: 0.7rem;
  }
`

export const TableSection = styled.div`
  width: 100%;

  .section-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    & > span {
      font-size: 0.8rem;
      opacity: 0.45;
    }
  }
`

export const OrgCard = styled(Card)`
  min-width: 320px;
  min-height: 250px;
`
