import { parse as urlParse } from 'url'
import moment from 'moment'
import { html } from 'js-beautify'
import _ from 'lodash'

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
    indent_size: 2,
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

export const getFirstLetter = (string) => {
  return string.slice(0, 1).toUpperCase()
}

export const isChangedComponentForm = (oldObj, newObj, ignoreList) => {
  if (
    (!ignoreList?.component_content && oldObj.component_content !== newObj.component_content) ||
    (!ignoreList?.is_ordered && !!oldObj.is_ordered !== !!newObj.is_ordered)
  )
    return true

  if (!_.isEqual((oldObj.tags || []).sort(), (newObj.tags || []).sort())) return true

  if (!_.isEqual((oldObj.linked_education || []).sort(), (newObj.linked_education || []).sort()))
    return true

  // medication
  if (
    !!oldObj.dose_range !== !!newObj.dose_range ||
    +(oldObj.dose_max || 0) !== +(newObj.dose_max || 0) ||
    +(oldObj.dose_min || 0) !== +(newObj.dose_min || 0) ||
    (oldObj.dose_units || '') !== (newObj.dose_units || '') ||
    !!oldObj.formulary !== !!newObj.formulary ||
    +(oldObj.formulary_conc || 0) !== +(newObj.formulary_conc || 0) ||
    (oldObj.formulary_units || '') !== (newObj.formulary_units || '')
  )
    return true

  return false
}
