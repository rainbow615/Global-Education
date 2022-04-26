import { COMPONENTS_TYPES } from '../config/constants'

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
