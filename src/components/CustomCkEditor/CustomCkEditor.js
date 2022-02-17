// import CKEditor from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// // import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview'
// // import Font from '@ckeditor/ckeditor5-font/src/font'
// // import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// // import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// // import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// // import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
// // import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
// // import List from '@ckeditor/ckeditor5-list/src/list'
// // import Link from '@ckeditor/ckeditor5-link/src/link'
// // import Indent from '@ckeditor/ckeditor5-indent/src/indent'
// // import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
// // import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'

import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { convertImageToBase64 } from '../../utils'

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        loader.file.then(async (file) => {
          try {
            const base64Data = await convertImageToBase64(file)

            resolve({
              default: base64Data,
            })
          } catch (err) {
            reject(err || 'Error: Upload failed')
          }
        })
      })
    },
  }
}

function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader)
  }
}

const CONFIG = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'imageUpload',
    ],
    language: 'en',
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
    ],
  },
  extraPlugins: [uploadPlugin],
}

const CustomCkEditor = (props) => {
  return (
    <React.Fragment>
      <CKEditor editor={ClassicEditor} config={CONFIG} {...props} />
    </React.Fragment>
  )
}

export default CustomCkEditor
