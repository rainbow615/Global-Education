import { EditOutlined } from '@ant-design/icons'
import { Card, Space, Table } from 'antd'
import styled from 'styled-components'

export const DashboardContainer = styled.div({
  width: '100%',
  display: 'grid',
  gap: '1rem',
  marginTop: '1rem',
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

export const DashboardHeader = styled.div(({ theme }) => ({
  display: 'flex',
  margin: '1.5rem 0 0',
  padding: '0.5rem 1.5rem',
  gap: '0.5rem',
  alignItems: 'center',
  background: 'white',
  h1: {
    margin: 0,
    fontSize: '1.5rem',
    fontFamily: 'InterMedium',
  },
}))

export const EditIcon = styled(EditOutlined)({
  position: 'relative',
  top: '0.25rem',
  fontSize: '1.25rem',
})
