import { Card, Table } from 'antd'
import styled from 'styled-components'

export const DashboardContainer = styled.div({
  width: '100%',
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
})

export const CustomTable = styled(Table)({
  height: '15rem',
  overflowY: 'scroll',
  tr: {
    cursor: 'pointer',
  },
  'tr:last-of-type td': {
    borderBottom: 'none',
  },
  'td: first-of-type': {
    paddingLeft: 0,
  },
})

export const CustomCard = styled(Card)({
  padding: '0.25rem 0.125rem .5rem',
  '.ant-card-body': {
    paddingTop: 1,
  },
})

export const CardBottom = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '1rem',
})

export const ComponentType = styled.span(({ theme }) => ({
  background: theme.palette.blueGrey[50],
  width: '1.5rem',
  height: '1.5rem',
  display: 'inline-flex',
  alignContent: 'center',
  justifyContent: 'center',
  border: '1px solid ' + theme.palette.blueGrey[100],
}))
