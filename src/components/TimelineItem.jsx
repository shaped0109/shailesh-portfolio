import { MapPin, Calendar } from 'lucide-react'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

/**
 * Single work experience entry in the vertical timeline.
 */
const TimelineItem = ({ company, title, dates, location, bullets, isLast = false, index = 0 }) => {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'relative pl-8 md:pl-14',
        'transition-[opacity,transform] duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-3 md:left-5 top-5 bottom-0 w-px bg-light-border dark:bg-dark-border" />
      )}

      {/* Node dot */}
      <div className="absolute left-1 md:left-3 top-4 w-4 h-4 rounded-full border-2 border-brand bg-light-elevated dark:bg-dark-surface shadow-teal-sm" />

      {/* Card */}
      <div className={cn(
        'mb-10 rounded-2xl p-6 md:p-8',
        'bg-white dark:bg-dark-card',
        'border border-light-border dark:border-dark-border',
        'shadow-card-light dark:shadow-card-dark',
        'hover:shadow-teal-sm hover:-translate-y-0.5',
        'transition-[transform,box-shadow] duration-200'
      )}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display font-semibold text-lg md:text-xl text-gray-900 dark:text-ink-primary">
              {title}
            </h3>
            <p className="text-brand font-semibold font-body text-sm mt-0.5">{company}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-ink-secondary font-body">
              <Calendar size={12} />
              {dates}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-ink-secondary font-body">
              <MapPin size={12} />
              {location}
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-ink-secondary font-body leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-brand shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TimelineItem
