import styled from 'styled-components'
import { Space } from 'antd'

export const Root = styled(Space)`
  width: 100%;
`
export const ListSection = styled.div(({ theme }) => ({
  background: theme.palette.white,
  padding: '.75rem 1rem 1rem 2rem',
  border: '1px solid #d9d9d9',
  borderRadius: 2,
  '.nestable-list, .nestable-item': {
    marginTop: '0.25rem',
  },
  minHeight: '11rem',
}))

export const ListItem = styled.div(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  borderRadius: 2,
  background: '#f5f5f5',
  padding: '0.25rem 0.125rem',
  border: '1px solid #f0f0f0',
  '.ant-tag': {
    marginRight: 5,
    fontFamily: 'InterBold',
  },
  '[data-icon="holder"]': {
    color: theme.palette.blueGrey[200],
  },
  '.remove-button-wrap': {
    position: 'absolute',
    left: '-2rem',
    top: 0,
    bottom: '0',
    width: '40px',
    height: '100%',
  },
  '.remove-button': {
    border: '0',
    borderRadius: 0,
    visibility: 'hidden',
    color: theme.palette.blueGrey[100],
    transition: 'color 0.2s ease-in-out',
    background: 'none',
    '&:hover': {
      color: theme.palette.danger,
    },
  },
  '&:hover': {
    '.remove-button': {
      visibility: 'visible',
    },
  },
}))

export const HTMLViewer = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  &.popup-item {
    overflow: hidden;
  }
`
