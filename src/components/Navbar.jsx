import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import useScrolled from '../hooks/useScrolled'
import { cn } from '../utils/cn'

const NAV_LINKS = [
  { to: '/',               label: 'Home' },
  { to: '/about',          label: 'About' },
  { to: '/experience',     label: 'Experience' },
  { to: '/skills',         label: 'Skills' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/testimonials',   label: 'Testimonials' },
  { to: '/contact',        label: 'Contact' },
]

const navLinkClass = ({ isActive }) => cn(
  'relative text-sm font-body font-medium tracking-wide transition-colors duration-200',
  'after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-full',
  'after:scale-x-0 after:transition-transform after:duration-200 after:bg-brand',
  'hover:text-brand hover:after:scale-x-100',
  isActive ? 'text-brand after:scale-x-100' : 'text-gray-600 dark:text-ink-secondary'
)

/**
 * Main navigation bar with mobile hamburger and dark/light mode toggle.
 */
const Navbar = () => {
  const scrolled = useScrolled(20)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          scrolled
            ? 'bg-light-base/85 dark:bg-dark-base/80 backdrop-blur-xl border-b border-light-border dark:border-dark-border shadow-card-light dark:shadow-card-dark'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="font-display font-bold text-lg tracking-tight text-gray-900 dark:text-ink-primary hover:text-brand transition-colors duration-200"
              aria-label="Shailesh Pedgaonkar — Home"
            >
              SP<span className="text-brand">.</span>
            </Link>

            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === '/'} className={navLinkClass} aria-current={undefined}>
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer"
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-ink-secondary hover:text-brand transition-colors duration-200"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        id="mobile-drawer"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden',
          'bg-light-elevated dark:bg-dark-surface',
          'border-l border-light-border dark:border-dark-border',
          'flex flex-col pt-20 pb-8 px-6',
          'transition-transform duration-300 ease-out',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to} to={to} end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => cn(
                'px-4 py-3 rounded-xl text-sm font-body font-medium transition-colors duration-150',
                isActive
                  ? 'bg-brand/10 text-brand'
                  : 'text-gray-600 dark:text-ink-secondary hover:bg-light-card dark:hover:bg-dark-elevated hover:text-gray-900 dark:hover:text-ink-primary'
              )}
              aria-current={undefined}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Navbar
