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
