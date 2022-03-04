import styled from 'styled-components'

import { Container } from '../../../components/CommonComponent'
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
  justify-content: space-around;
  flex-wrap: wrap;

  @media only screen and (max-width: 1370px) {
    flex-direction: column;
    align-items: center;
  }
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
`

export const BookViewer = styled.div`
  border: 1px solid grey;
  flex: 1;
  padding: 40px 30px;
  aspect-ratio: 8/10;
  max-height: 822px;
  max-width: 600px;
  min-width: 400px;
  overflow-y: auto;
`

export const HTMLViewer = styled.div`
  height: 100%;
  overflow-y: auto;
`
