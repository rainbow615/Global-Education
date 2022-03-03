import styled from 'styled-components'

import { Container } from '../../../components/CommonComponent'
import iphoneBezel from '../../../assets/img/iphone.png'

export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Root = styled(Container)`
  justify-content: space-between;
  flex-wrap: wrap;
`

export const MobielViewer = styled.div`
  background-image: url(${iphoneBezel});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 420px;
  height: 822px;
  padding: 80px 36px 69px 55px;
`

export const HTMLViewer = styled.div`
  height: 100%;
  overflow-y: auto;
`
