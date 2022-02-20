import styled from 'styled-components'
import { Descriptions, Statistic, Modal } from 'antd'

export const LeftSection = styled.div`
  max-width: 370px;
  margin-bottom: 40px;
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

export const CustomDescriptions = styled(Descriptions)`
  margin-bottom: 30px;

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

export const AddressInfoModal = styled(Modal)`
  .bottom-actions {
    text-align: right;
    margin-top: 45px;
    margin-bottom: 0;
  }
`
