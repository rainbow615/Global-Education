import { Root, TitleBar, MobielViewer, BookViewer, ViewerContainer, HTMLViewer } from './styles'

const PreviewMobileAndBook = (props) => {
  const { title, content } = props

  return (
    <Root>
      <MobielViewer>
        <ViewerContainer>
          <TitleBar>{title}</TitleBar>
          <HTMLViewer className="wyswyg-editor" dangerouslySetInnerHTML={{ __html: content }} />
        </ViewerContainer>
      </MobielViewer>
      <BookViewer>
        <ViewerContainer>
          <TitleBar>{title}</TitleBar>
          <HTMLViewer className="wyswyg-editor" dangerouslySetInnerHTML={{ __html: content }} />
        </ViewerContainer>
      </BookViewer>
    </Root>
  )
}

export default PreviewMobileAndBook
