import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

/**
 * Single certification card with badge image.
 * @param {{ name: string, issuer: string, year?: string, badge?: string, index?: number }} props
 */
const CertCard = ({ name, issuer, year, badge, index = 0 }) => {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center text-center rounded-2xl p-6',
        'bg-white dark:bg-dark-card',
        'border border-light-border dark:border-dark-border',
        'shadow-card-light dark:shadow-card-dark',
        'hover:shadow-teal-md hover:-translate-y-1 hover:border-brand/30',
        'transition-[transform,box-shadow,border-color] duration-300 opacity-0',
        inView && 'animate-fade-up opacity-100'
      )}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      {/* Badge image */}
      <div className="w-28 h-28 mb-5 flex items-center justify-center">
        <img
          src={badge}
          alt={`${name} badge`}
          className="w-full h-full object-contain drop-shadow-sm"
          loading="lazy"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-ink-primary leading-snug mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-ink-secondary font-body">{issuer}</p>
      </div>

      {year && (
        <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border w-full">
          <span className="text-xs font-body font-medium text-brand uppercase tracking-widest">{year}</span>
        </div>
      )}
    </div>
  )
}

export default CertCard
