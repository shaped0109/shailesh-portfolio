import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

const STATS = [
  { value: '18+', label: 'Years Experience' },
  { value: '15+', label: 'Apps Delivered' },
  { value: '0',   label: 'Post-Release Rollbacks' },
  { value: '5+',  label: 'Industry Awards' },
]

/**
 * Horizontal strip of key professional stats shown on the Home page.
 */
const StatStrip = () => {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'w-full border-y border-dark-border dark:border-dark-border',
        'light:border-light-border',
        'bg-dark-surface/60 dark:bg-dark-surface/60 light:bg-light-card/60',
        'backdrop-blur-sm',
        'transition-opacity duration-700',
        inView ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-dark-border dark:divide-dark-border light:divide-light-border">
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={cn(
                'flex flex-col items-center text-center px-4',
                'transition-transform duration-500',
                inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className="font-display font-700 text-3xl md:text-4xl text-brand tracking-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                {value}
              </span>
              <span className="mt-1 text-sm text-ink-secondary dark:text-ink-secondary light:text-ink-muted font-body font-medium uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatStrip
