import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

const useScrollTo = () => {
  const hash = useLocation({ select: (location) => location.hash })
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash)
      element?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [hash])
}

export default useScrollTo
