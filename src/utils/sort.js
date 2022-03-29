export const dynamicSort = (property) => {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}

export const dynamicSortMultiple = (args) => {
  const props = args
  return function (obj1, obj2) {
    let i = 0,
      result = 0,
      numberOfProperties = props.length
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2)
      i++
    }
    return result
  }
}
