import { useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const useScrollTo = () => {
  const [scrolled, setScrolled] = useState(false)
  const hash = useLocation({ select: (location) => location.hash })
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash)
      element?.scrollIntoView({
        behavior: 'smooth',
      })
      setScrolled(true)
    } else {
      if (!scrolled) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        setScrolled(true)
      }
    }
  }, [hash, scrolled])
}

export default useScrollTo
