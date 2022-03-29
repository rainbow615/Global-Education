import { parse as urlParse } from 'url'
import moment from 'moment'
import { html } from 'js-beautify'

export const getQueryParams = (url = window.location.href.replace(/#/g, '')) => {
  return urlParse(url, true).query
}

/**
 * must include uppercase
 * must include lowercase
 * must include special character
 * must include number
 */
export const passwordPattern = (options = {}) => {
  let exp = '^'
  exp += options.lowercase ? '(?=.*[a-z])' : ''
  exp += options.uppercase ? '(?=.*[A-Z])' : ''
  exp += options.special ? '(?=.*[-+_!@#$%^&*.,?])' : ''
  exp += options.number ? '(?=.*\\d)' : ''
  exp += '.+$'

  return new RegExp(exp)
}

export const getMainPathname = (path) => {
  const obj = path.split('/')

  return `/${obj[1]}`
}

export const formatLocalizedDate = (date, format = 'LL') => {
  return moment(new Date(date)).format(format)
}

export const convertImageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const regExpEscape = (string) => {
  // eslint-disable-next-line
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export const formatHTMLForDiff = (htmlStr, textOnly = true) => {
  const htmlStylingOptions = {
    indent_size: 4,
    html: {
      end_with_newline: true,
    },
  }

  const formattedHTML = html(htmlStr, htmlStylingOptions)

  if (textOnly) {
    return new DOMParser().parseFromString(formattedHTML, 'text/html').body.innerText
  }

  return formattedHTML
}
