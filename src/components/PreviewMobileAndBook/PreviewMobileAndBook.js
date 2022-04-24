import { Root, TitleBar, MobileViewer, ViewerContainer, HTMLViewer } from './styles'

const PreviewMobileAndBook = (props) => {
  const { title, content } = props

  return (
    <Root>
      <MobileViewer>
        <ViewerContainer>
          <TitleBar>{title}</TitleBar>
          <HTMLViewer dangerouslySetInnerHTML={{ __html: content }} />
        </ViewerContainer>
      </MobileViewer>
      {/* <BookViewer>
        <ViewerContainer>
          <TitleBar>{title}</TitleBar>
          <HTMLViewer dangerouslySetInnerHTML={{ __html: content }} />
        </ViewerContainer>
      </BookViewer> */}
    </Root>
  )
}

export default PreviewMobileAndBook
