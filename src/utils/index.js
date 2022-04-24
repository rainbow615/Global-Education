import { parse as urlParse } from 'url'
import moment from 'moment'
import { html } from 'js-beautify'
import _ from 'lodash'
import { COMPONENTS_TYPES } from '../config/constants'

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

export const findItemNested = (array, searchString, filterKeys, nestingKey) => {
  return array.reduce((acc, { [nestingKey]: nested, ...o }) => {
    if (filterKeys.some((k) => o[k] && o[k].includes(searchString))) acc.push(o)

    if (nested) acc.push(...findItemNested(nested, searchString, filterKeys, nestingKey))

    return acc
  }, [])
}

export const removeItemNested = (array, searchString, filterKey, nestingKey) => {
  const newArray = [...array]
    .map((obj) => {
      if (obj[filterKey] === searchString) return null

      if (obj[nestingKey] && obj[nestingKey].length > 0) {
        const newChildren = removeItemNested(obj[nestingKey], searchString, filterKey, nestingKey)

        obj[nestingKey] = newChildren
      }

      return obj
    })
    .filter((obj) => !!obj)

  return newArray
}

export const convertAPIFormatValue = (array) => {
  const newArray = [...array].map((obj) => {
    if (obj.children && obj.children.length > 0) {
      const newChildren = [...obj.children].map((obj1) => {
        if (obj1.children && obj1.children.length > 0) {
          const newChildren2 = [...obj1.children].map((obj2) => {
            const newObj2 = {
              ...obj2,
            }

            delete newObj2.id
            delete newObj2.accepts
            delete newObj2.children

            return newObj2
          })

          obj1.children = newChildren2
        }

        const newObj1 = {
          ...obj1,
        }

        if (obj1.component_type === COMPONENTS_TYPES[2].id) {
          newObj1.block_children = obj1.children
        }

        delete newObj1.id
        delete newObj1.accepts
        delete newObj1.children

        return newObj1
      })

      obj.children = newChildren
    }

    const newObj = {
      ...obj,
    }

    if (obj.component_type === COMPONENTS_TYPES[2].id) {
      newObj.block_children = obj.children
    } else if (obj.component_type === COMPONENTS_TYPES[0].id) {
      newObj.section_children = obj.children
    }

    delete newObj.id
    delete newObj.accepts
    delete newObj.children

    return newObj
  })

  return newArray
}

export const convertDragNDropFormatValue = (array) => {
  const newArray = [...array].map((obj) => {
    const newObj = {
      ...obj,
      id: obj.component_id,
    }

    if (obj.component_type === COMPONENTS_TYPES[2].id) {
      newObj.children = obj.block_children
      newObj.accepts = [COMPONENTS_TYPES[1].id, COMPONENTS_TYPES[3].id, COMPONENTS_TYPES[4].id]
    } else if (obj.component_type === COMPONENTS_TYPES[0].id) {
      newObj.children = obj.section_children
      newObj.accepts = [
        COMPONENTS_TYPES[1].id,
        COMPONENTS_TYPES[2].id,
        COMPONENTS_TYPES[3].id,
        COMPONENTS_TYPES[4].id,
      ]
    }

    if (newObj.children && newObj.children.length > 0) {
      const newChildren = [...newObj.children].map((obj1) => {
        const newObj1 = {
          ...obj1,
          id: obj1.component_id,
        }

        if (obj1.component_type === COMPONENTS_TYPES[2].id) {
          newObj1.children = obj1.block_children
          newObj1.accepts = [COMPONENTS_TYPES[1].id, COMPONENTS_TYPES[3].id, COMPONENTS_TYPES[4].id]
        }

        if (newObj1.children && newObj1.children.length > 0) {
          const newChildren2 = [...newObj1.children].map((obj2) => {
            const newObj2 = {
              ...obj2,
              id: obj2.component_id,
            }

            delete newObj2.block_children
            delete newObj2.section_children

            return newObj2
          })

          newObj1.children = newChildren2
        }

        delete newObj1.block_children

        return newObj1
      })

      newObj.children = newChildren
    }

    delete newObj.block_children
    delete newObj.section_children

    return newObj
  })

  return newArray
}
