import { useEffect, useState } from 'react'

/**
 * Returns true once the user has scrolled past `threshold` pixels.
 * @param {number} threshold
 * @returns {boolean}
 */
const useScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}

export default useScrolled
