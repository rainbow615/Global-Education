import styled from 'styled-components'

import { Container } from '../../CommonComponent'
import iphoneBezel from '../../../assets/img/iphone.png'

export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TitleBar = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 10px;
`

export const Root = styled(Container)`
  justify-content: space-between;
  flex-wrap: wrap;
  transform: scale(0.7);
  height: 688px;
  padding: 0;
  margin-top: -40px;
`

export const MobielViewer = styled.div`
  background-image: url(${iphoneBezel});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 420px;
  height: 822px;
  padding: 80px 36px 69px 55px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`

export const BookViewer = styled.div`
  border: 1px solid grey;
  flex: 1;
  padding: 40px 30px;
  aspect-ratio: 8/10;
  max-height: 822px;
  max-width: 600px;
  min-width: 400px;
`

export const ViewerContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`

export const HTMLViewer = styled.div`
  flex: 1;
  overflow-y: auto;
`
