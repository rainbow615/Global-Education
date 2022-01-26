import { parse as urlParse } from 'url'

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
