import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ScrollToTop from './components/ScrollToTop'
import { cn } from './utils/cn'
import usePageTracking from './hooks/usePageTracking'

// Lazy-loaded page components
const Home           = lazy(() => import('./pages/Home'))
const About          = lazy(() => import('./pages/About'))
const Experience     = lazy(() => import('./pages/Experience'))
const Skills         = lazy(() => import('./pages/Skills'))
const Certifications = lazy(() => import('./pages/Certifications'))
const Contact        = lazy(() => import('./pages/Contact'))
const Projects       = lazy(() => import('./pages/Projects'))
const Testimonials   = lazy(() => import('./pages/Testimonials'))
const NotFound       = lazy(() => import('./pages/NotFound'))

/**
 * Minimal loading fallback shown while lazy pages are fetched.
 */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-base dark:bg-dark-base light:bg-light-base">
    <div className={cn(
      'w-8 h-8 rounded-full border-2 border-dark-border dark:border-dark-border light:border-light-border',
      'border-t-brand animate-spin'
    )} />
  </div>
)

/**
 * Root component — defines all routes inside the main layout.
 */
const App = () => {
  usePageTracking()
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/experience"     element={<Experience />} />
          <Route path="/skills"         element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/projects"      element={<Projects />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/testimonials"   element={<Testimonials />} />
          <Route path="*"               element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
