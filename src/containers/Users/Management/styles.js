import styled from 'styled-components'
import { Descriptions, Statistic, Card } from 'antd'

export const LeftSection = styled.div`
  max-width: 370px;
  min-width: 240px;
  padding-top: 5px;
`

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const CustomDescriptions = styled(Descriptions)`
  margin-bottom: 1rem;
  * {
    font-size: 0.8rem;
    color: #1f2532;
  }

  tr:nth-of-type(even) {
    height: 25px;
  }

  th {
    width: 50%;
    padding-bottom: 0;
  }

  td {
    padding-bottom: 0;
  }

  .ant-descriptions-view {
    width: 225px;
  }

  span {
    color: ${(props) => props.theme.palette.disabledText};
  }
`

export const CustomStatistic = styled(Statistic)`
  margin-bottom: 1rem;

  .ant-statistic-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .ant-statistic-content {
    span {
      white-space: pre-wrap;
    }
    font-size: 1rem;
  }

  button {
    font-size: 0.7rem;
  }
`

export const TableSection = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  .section-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    & > span {
      font-size: 0.8rem;
      color: #848578;
    }
  }
`

export const OrgCard = styled(Card)`
  min-width: 320px;
  min-height: 250px;
  .ant-card-body {
    padding: 0 20px;
  }
`
