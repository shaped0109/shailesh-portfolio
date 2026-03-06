import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

/**
 * Single skill category card with curated skill tags.
 * @param {{ category: string, icon: React.ReactNode, skills: string[], index?: number }} props
 */
const SkillCard = ({ category, icon, skills, index = 0 }) => {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl p-6 md:p-8',
        'bg-white dark:bg-dark-card',
        'border border-light-border dark:border-dark-border',
        'shadow-card-light dark:shadow-card-dark',
        'hover:shadow-teal-md hover:-translate-y-1',
        'transition-[transform,box-shadow] duration-300 opacity-0',
        inView && 'animate-fade-up opacity-100'
      )}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0">
          {icon}
        </div>
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-ink-primary">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-body font-medium',
              'bg-light-card dark:bg-dark-elevated',
              'text-gray-700 dark:text-ink-secondary',
              'border border-light-border dark:border-dark-border',
              'hover:border-brand/50 hover:text-brand transition-colors duration-200'
            )}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SkillCard
