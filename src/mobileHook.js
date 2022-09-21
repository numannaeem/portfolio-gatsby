import { useEffect, useState } from 'react'

const useCheckMobileScreen = () => {
  if (typeof window === 'undefined') return
  const [width, setWidth] = useState(window.innerWidth)
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return width <= 768
}

export default useCheckMobileScreen
