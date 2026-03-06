import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and a boolean indicating if the element is in the viewport.
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 * @returns {[React.RefObject, boolean]}
 */
const useInView = ({ threshold = 0.15, rootMargin = '0px', once = true } = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

export default useInView
