import styled from 'styled-components'

import { Container } from '../CommonComponent'
import iphoneBezel from '../../assets/img/iphone.png'

export const TitleBar = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.5vh;
  font-weight: bold;
  margin-bottom: 10px;
`

export const Root = styled(Container)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 60vh;
`

export const MobileViewer = styled.div`
  background-image: url(${iphoneBezel});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  aspect-ratio: 400 / 812;
  padding: 4vh 2vh 4vh 3vh;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  & > div {
    margin-top: 1.5vh;
    font-size: 1.5vh;
  }
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
  height: 100vh;
  overflow-x: hidden;
  img {
    max-width: 100%;
  }
`

export const HTMLViewer = styled.div`
  flex: 1;
  overflow-y: auto;
`
