import { Award } from 'lucide-react'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

/**
 * Single certification card.
 * @param {{ name: string, issuer: string, year?: string, index?: number }} props
 */
const CertCard = ({ name, issuer, year, index = 0 }) => {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col rounded-2xl p-6',
        'bg-white dark:bg-dark-card',
        'border border-light-border dark:border-dark-border',
        'shadow-card-light dark:shadow-card-dark',
        'hover:shadow-teal-md hover:-translate-y-1 hover:border-brand/30',
        'transition-[transform,box-shadow,border-color] duration-300 opacity-0',
        inView && 'animate-fade-up opacity-100'
      )}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-4">
        <Award size={22} strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-ink-primary leading-snug mb-2">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-ink-secondary font-body">{issuer}</p>
      </div>
      {year && (
        <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
          <span className="text-xs font-body font-medium text-brand uppercase tracking-widest">{year}</span>
        </div>
      )}
    </div>
  )
}

export default CertCard
