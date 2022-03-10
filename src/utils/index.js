import { parse as urlParse } from 'url'
import moment from 'moment'
import { html } from 'js-beautify'

import { JIT_ACTIONS, PROTOCOL_STATUS } from '../config/constants'

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

export const getJITStatusName = (value) => {
  let statusName = ''

  if (value === JIT_ACTIONS.PUBLISHED) statusName = 'Published'
  if (value === JIT_ACTIONS.UNPUBLISHED) statusName = 'Unpublished'
  if (value === JIT_ACTIONS.DRAFT) statusName = 'Draft'
  if (value === JIT_ACTIONS.INREVIEW) statusName = 'In-Review'
  if (value === JIT_ACTIONS.APPROVED) statusName = 'Approved'
  if (value === JIT_ACTIONS.DELETED) statusName = 'Deleted'

  return statusName
}

export const getProtocolStatusName = (value) => {
  let statusName = ''

  if (value === PROTOCOL_STATUS.PUBLISHED) statusName = 'Published'
  if (value === PROTOCOL_STATUS.BUILDING) statusName = 'Building'
  if (value === PROTOCOL_STATUS.INREVIEW) statusName = 'In-Review'
  if (value === PROTOCOL_STATUS.READYTOPUBLISH) statusName = 'Ready to publish'

  return statusName
}

export const getProtocolStatusColor = (value) => {
  let statusName = ''

  if (value === PROTOCOL_STATUS.PUBLISHED) statusName = 'success'
  if (value === PROTOCOL_STATUS.BUILDING) statusName = 'danger'
  if (value === PROTOCOL_STATUS.INREVIEW) statusName = 'info'
  if (value === PROTOCOL_STATUS.READYTOPUBLISH) statusName = 'warning'

  return statusName
}

export const getProtocolButtonName = (value) => {
  let statusName = ''

  if (value === PROTOCOL_STATUS.PUBLISHED) statusName = 'View'
  if (value === PROTOCOL_STATUS.BUILDING) statusName = 'Build'
  if (value === PROTOCOL_STATUS.INREVIEW) statusName = 'Review'
  if (value === PROTOCOL_STATUS.READYTOPUBLISH) statusName = 'Publish'

  return statusName
}
