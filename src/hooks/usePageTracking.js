import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Fires a GoatCounter page view on every React Router navigation.
 * The script tag in index.html handles the initial page load automatically.
 */
const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.goatcounter?.count !== 'function') return
    window.goatcounter.count({
      path: location.pathname + location.search + location.hash,
    })
  }, [location])
}

export default usePageTracking
