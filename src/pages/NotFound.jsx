import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../utils/cn'

/**
 * 404 Not Found page.
 */
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-light-base dark:bg-dark-base px-4">
    <div className="text-center max-w-md">
      <p className="font-display font-bold text-8xl text-brand/20 mb-2">404</p>
      <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-ink-primary mb-4 tracking-tight">
        Page Not Found
      </h1>
      <p className="font-body text-gray-600 dark:text-ink-secondary mb-8 leading-relaxed">
        This route doesn't exist. Let's get you back to somewhere that does.
      </p>
      <Link
        to="/"
        className={cn(
          'inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl',
          'bg-brand hover:bg-brand-700 text-white font-body font-semibold text-sm',
          'shadow-teal-md hover:shadow-teal-lg transition-[background-color,box-shadow] duration-200'
        )}
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  </div>
)

export default NotFound
