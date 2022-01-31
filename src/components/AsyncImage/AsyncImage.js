import { useCallback, useEffect, useState } from 'react'
import { Spin } from 'antd'

const AsyncImage = (props) => {
  const { src, alt, skeletonW, onCompleteLoad = () => null, ...rest } = props
  const [url, setUrl] = useState('')

  const onLoad = useCallback(() => {
    setUrl(src)
    onCompleteLoad()
  }, [src, onCompleteLoad])

  useEffect(() => {
    const imageLoader = new Image()
    imageLoader.src = src

    imageLoader.addEventListener('load', onLoad)

    return () => {
      imageLoader.removeEventListener('load', onLoad)
    }
  }, [src, onLoad])

  return url ? <img src={url} alt={alt} {...rest} /> : <Spin size="large" />
}

export default AsyncImage
