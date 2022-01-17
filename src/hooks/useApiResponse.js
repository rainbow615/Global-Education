import { useEffect, useState } from 'react'

export default function useApiResponse(res) {
  const [value, setValue] = useState(res)

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(res)) {
      setValue(res)
    }
  }, [res, value])

  return value
}
