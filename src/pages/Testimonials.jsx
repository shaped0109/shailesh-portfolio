import { useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'
import { ExternalLink, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/testimonials'

const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS]
const ROW2 = [...MARQUEE_ITEMS].reverse()

const MarqueeChip = ({ name, title, company, quote }) => (
  <div className={cn(
    'flex-shrink-0 mx-3 px-5 py-3.5 rounded-2xl',
    'bg-white dark:bg-dark-card',
    'border border-light-border dark:border-dark-border',
    'max-w-xs cursor-default select-none'
  )}>
    <p className="font-body text-xs text-gray-600 dark:text-ink-secondary leading-snug mb-2 line-clamp-2">
      "{quote}"
    </p>
    <p className="font-display font-semibold text-xs text-gray-900 dark:text-ink-primary">{name}</p>
    <p className="font-body text-xs text-gray-400 dark:text-ink-muted">{title} · {company}</p>
  </div>
)

const Spotlight = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [ref, inView] = useInView()

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActiveIndex(i => (i + 1) % TESTIMONIALS.length)
        setVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const active = TESTIMONIALS[activeIndex]

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-3xl overflow-hidden px-8 py-12 md:px-16 md:py-16',
        'bg-dark-surface dark:bg-dark-surface light:bg-gray-900',
        'border border-dark-muted',
        'transition-[opacity,transform] duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-brand/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-amber/5 blur-[60px] pointer-events-none" />
      <div className="absolute top-6 left-8 font-display font-bold text-[8rem] leading-none text-brand/10 select-none pointer-events-none" aria-hidden="true">
        &ldquo;
      </div>

      <div className={cn('relative z-10 transition-opacity duration-400', visible ? 'opacity-100' : 'opacity-0')}>
        <blockquote
          className="font-display font-semibold text-xl md:text-2xl lg:text-3xl text-white leading-snug mb-8 max-w-3xl"
          style={{ letterSpacing: '-0.02em' }}
        >
          "{active.quote}"
        </blockquote>
        <p className="font-body text-sm text-gray-300 leading-relaxed max-w-2xl mb-8">{active.full}</p>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-sm text-brand">
              {active.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-white">{active.name}</p>
            <p className="font-body text-xs text-gray-400">{active.title} · {active.company}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-10 relative z-10">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setActiveIndex(i); setVisible(true) }, 400) }}
            aria-label={`View testimonial from ${TESTIMONIALS[i].name}`}
            className={cn(
              'rounded-full transition-[width,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              i === activeIndex ? 'w-6 h-2 bg-brand' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  )
}

const TestimonialCard = ({ name, title, company, quote, full, index }) => {
  const [expanded, setExpanded] = useState(false)
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl p-5 flex flex-col gap-3',
        'bg-white dark:bg-dark-card',
        'border border-light-border dark:border-dark-border',
        'hover:border-brand/30 transition-[opacity,transform,border-color] duration-500',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Quote size={16} className="text-brand/40 shrink-0" />
      <p className="font-body text-sm text-gray-600 dark:text-ink-secondary leading-relaxed">
        {expanded ? full : `"${quote}"`}
      </p>
      <button
        onClick={() => setExpanded(v => !v)}
        className="self-start text-xs font-body font-medium text-brand hover:text-brand-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
      <div className="mt-auto pt-3 border-t border-light-border dark:border-dark-border">
        <p className="font-display font-semibold text-sm text-gray-900 dark:text-ink-primary">{name}</p>
        <p className="font-body text-xs text-gray-500 dark:text-ink-muted mt-0.5">{title} · {company}</p>
      </div>
    </div>
  )
}

/**
 * Testimonials page — spotlight rotator + full card grid + marquee.
 */
const Testimonials = () => {
  const [ref, inView] = useInView()

  return (
    <div className="bg-light-base dark:bg-dark-base">
      {/* Page header */}
      <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">Social Proof</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-ink-primary tracking-tight">
            What Colleagues Say
          </h1>
          <p className="font-body text-base md:text-lg text-gray-600 dark:text-ink-secondary mt-4 max-w-xl">
            9 LinkedIn recommendations from engineers, managers, and HR leaders across EXFO and Nokia.
          </p>
        </div>
      </div>

      {/* Spotlight */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 mb-16">
        <Spotlight />
      </section>

      {/* All cards grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 mb-16">
        <div
          ref={ref}
          className={cn(
            'mb-8 transition-[opacity,transform] duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-ink-primary tracking-tight">
            All Recommendations
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </section>

      {/* Marquee strip */}
      <div className="overflow-hidden mb-16 flex flex-col gap-4">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-left">
            {MARQUEE_ITEMS.map((t, i) => <MarqueeChip key={`r1-${i}`} {...t} />)}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-right">
            {ROW2.map((t, i) => <MarqueeChip key={`r2-${i}`} {...t} />)}
          </div>
        </div>
      </div>

      {/* LinkedIn CTA */}
      <div className="flex justify-center pb-24">
        <a
          href="https://www.linkedin.com/in/shailesh-pedgaonkar/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2 px-6 py-3 rounded-xl',
            'border border-light-border dark:border-dark-border',
            'bg-white dark:bg-dark-card',
            'font-body text-sm font-medium text-gray-700 dark:text-ink-secondary',
            'hover:border-brand/40 hover:text-brand transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand'
          )}
        >
          <ExternalLink size={14} />
          View all on LinkedIn
        </a>
      </div>
    </div>
  )
}

export default Testimonials
