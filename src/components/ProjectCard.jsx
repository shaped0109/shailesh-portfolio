import { Code2, User, Monitor, Server, Layers, ArrowUp } from 'lucide-react'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

/**
 * Project card — large diagram hero, with client/server annotation columns beneath.
 * @param {{
 *   title: string,
 *   status: string,
 *   role: string,
 *   description: string,
 *   architecture?: { client: { title: string, points: string[] }, server: { title: string, points: string[] } },
 *   stack: { label: string, category: string }[],
 *   diagramSrc?: string,
 *   diagramSrcDark?: string,
 *   diagramAlt?: string,
 *   index?: number
 * }} props
 */
const ProjectCard = ({ title, status, role, description, architecture, stack, diagramSrc, diagramSrcDark, diagramAlt, projectNumber, onBackToList, index = 0 }) => {
  const [ref, inView] = useInView()

  const statusColors = {
    'In Progress': 'bg-brand/10 text-brand border-brand/20',
    'Completed':   'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Planning':    'bg-amber/10 text-amber border-amber/20',
  }

  const categoryColors = {
    Frontend:  'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    Backend:   'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    Cloud:     'bg-brand/10 text-brand',
    Database:  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    DevOps:    'bg-amber/10 text-amber',
    AI:        'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    Mobile:    'bg-indigo-500/10 text-indigo-400',
    Testing:   'bg-orange-500/10 text-orange-500 dark:text-orange-400',
    Other:     'bg-light-card dark:bg-dark-elevated text-ink-secondary',
  }

  return (
    <article
      ref={ref}
      className={cn(
        'rounded-2xl overflow-hidden',
        'bg-white dark:bg-dark-card',
        'border border-light-border dark:border-dark-border',
        'shadow-card-light dark:shadow-card-dark',
        'transition-[box-shadow,border-color] duration-300 opacity-0',
        inView && 'animate-fade-up opacity-100'
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <div className="px-8 pt-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
              <Code2 size={22} strokeWidth={1.5} />
              {projectNumber && (
                <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-body font-bold flex items-center justify-center">
                  {projectNumber}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-display font-bold text-xl lg:text-2xl text-gray-900 dark:text-ink-primary leading-tight">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <User size={12} strokeWidth={1.75} className="text-brand shrink-0" />
                <span className="text-sm font-body font-semibold text-brand">{role}</span>
              </div>
            </div>
          </div>
          <span className={cn(
            'self-start text-xs font-body font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border whitespace-nowrap',
            statusColors[status] ?? statusColors['Planning']
          )}>
            {status}
          </span>
        </div>

        <p className="font-body text-sm md:text-base text-gray-600 dark:text-ink-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* ── Architecture Diagram (full-width hero) ── */}
      {diagramSrc && (
        <div className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-elevated">
          {/* Section label */}
          <div className="px-8 pt-6 pb-4 flex items-center gap-2">
            <Layers size={14} strokeWidth={1.75} className="text-brand" />
            <span className="text-xs font-body font-semibold text-brand uppercase tracking-widest">
              System Architecture
            </span>
          </div>

          {/* Diagram — full width, large */}
          <div className="px-8 pb-6">
            <div className={cn(
              'rounded-xl overflow-hidden w-full',
              'border border-light-border dark:border-dark-border',
              'bg-white dark:bg-dark-card',
              'shadow-card-light dark:shadow-card-dark'
            )}>
              {diagramSrcDark ? (
                <>
                  <img
                    src={diagramSrc}
                    alt={diagramAlt ?? 'Architecture diagram'}
                    className="block dark:hidden w-full h-auto"
                  />
                  <img
                    src={diagramSrcDark}
                    alt={diagramAlt ?? 'Architecture diagram'}
                    className="hidden dark:block w-full h-auto"
                  />
                </>
              ) : (
                <img
                  src={diagramSrc}
                  alt={diagramAlt ?? 'Architecture diagram'}
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>

          {/* ── Client / Server annotation columns ── */}
          {architecture && (
            <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Client */}
              {architecture.client && (
                <div className={cn(
                  'rounded-xl p-5',
                  'bg-sky-500/5 dark:bg-sky-500/8',
                  'border border-sky-500/15 dark:border-sky-500/20'
                )}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/15 flex items-center justify-center">
                      <Monitor size={14} strokeWidth={1.75} className="text-sky-600 dark:text-sky-400" />
                    </div>
                    <span className="text-xs font-body font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                      {architecture.client.title}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {architecture.client.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-body text-gray-600 dark:text-ink-secondary leading-relaxed">
                        <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Server */}
              {architecture.server && (
                <div className={cn(
                  'rounded-xl p-5',
                  'bg-violet-500/5 dark:bg-violet-500/8',
                  'border border-violet-500/15 dark:border-violet-500/20'
                )}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center">
                      <Server size={14} strokeWidth={1.75} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className="text-xs font-body font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                      {architecture.server.title}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {architecture.server.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-body text-gray-600 dark:text-ink-secondary leading-relaxed">
                        <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Tech Stack ─────────────────────────────── */}
      {stack?.length > 0 && (
        <div className="px-8 py-6 border-t border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-body font-semibold text-ink-muted uppercase tracking-widest">
              Tech Stack
            </p>
            {onBackToList && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 text-xs font-body text-ink-muted hover:text-brand transition-colors duration-200"
              >
                <ArrowUp size={11} strokeWidth={2} />
                Go to Top
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map(({ label, category }) => (
              <span
                key={label}
                className={cn(
                  'text-xs font-body font-medium px-2.5 py-1 rounded-lg',
                  categoryColors[category] ?? categoryColors['Other']
                )}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default ProjectCard
