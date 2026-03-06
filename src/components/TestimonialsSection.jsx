import { useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'
import { ExternalLink } from 'lucide-react'
import { TESTIMONIALS } from '../data/testimonials'

// Duplicate for seamless marquee loop
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS]
const ROW1 = MARQUEE_ITEMS
const ROW2 = [...MARQUEE_ITEMS].reverse()

/**
 * A single marquee chip — shows quote + name.
 */
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

/**
 * Spotlight quote — large rotating featured testimonial.
 */
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
      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-brand/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-amber/5 blur-[60px] pointer-events-none" />

      {/* Giant quote mark */}
      <div
        className="absolute top-6 left-8 font-display font-bold text-[8rem] leading-none text-brand/10 select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote content */}
      <div
        className={cn(
          'relative z-10 transition-opacity duration-400',
          visible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <blockquote className="font-display font-semibold text-xl md:text-2xl lg:text-3xl text-white leading-snug mb-8 max-w-3xl"
          style={{ letterSpacing: '-0.02em' }}
        >
          "{active.quote}"
        </blockquote>

        <div className="flex items-center gap-4">
          {/* Initials avatar */}
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

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-10 relative z-10">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setActiveIndex(i); setVisible(true) }, 400) }}
            aria-label={`View testimonial from ${TESTIMONIALS[i].name}`}
            className={cn(
              'rounded-full transition-[width,opacity] duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              i === activeIndex
                ? 'w-6 h-2 bg-brand'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Testimonials section — large spotlight rotator + dual marquee strip.
 */
const TestimonialsSection = () => {
  const [ref, inView] = useInView()

  return (
    <section className="bg-light-base dark:bg-dark-base py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">

        {/* Header */}
        <div
          ref={ref}
          className={cn(
            'mb-10 transition-[opacity,transform] duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">
            Social Proof
          </p>
          <div className="flex flex-wrap items-end gap-4">
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-ink-primary tracking-tight">
              What colleagues say
            </h2>
            <span className={cn(
              'mb-1 px-3 py-1 rounded-full text-xs font-body font-semibold',
              'bg-brand/10 text-brand border border-brand/20'
            )}>
              9 LinkedIn Recommendations
            </span>
          </div>
        </div>

        {/* Spotlight */}
        <div className="mb-10">
          <Spotlight />
        </div>

      </div>

      {/* Marquee — full bleed (outside max-w container) */}
      <div className="flex flex-col gap-4">
        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-left">
            {ROW1.map((t, i) => (
              <MarqueeChip key={`r1-${i}`} {...t} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-right">
            {ROW2.map((t, i) => (
              <MarqueeChip key={`r2-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* LinkedIn CTA */}
      <div className="flex justify-center mt-10 px-4">
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
    </section>
  )
}

export default TestimonialsSection
