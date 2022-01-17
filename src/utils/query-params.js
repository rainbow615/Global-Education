import { parse as urlParse } from 'url'

export const getQueryParams = (url = window.location.href.replace(/#/g, '')) => {
  return urlParse(url, true).query
}
