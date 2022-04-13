import styled from 'styled-components'

export const DashboardContainer = styled.div({
  width: '100%',
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
})
