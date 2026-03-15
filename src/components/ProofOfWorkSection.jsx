import { Link } from 'react-router-dom'
import { ArrowRight, Layers, MessageSquare } from 'lucide-react'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

const CARDS = [
  {
    to: '/projects',
    eyebrow: 'Case Studies',
    icon: Layers,
    headline: 'Engineered.\nDeployed & Proven.',
    description:
      'Full-stack systems designed, built, and shipped — with architecture diagrams, stack breakdowns, and my exact role on every project.',
    bullets: [
      'Angular + Node.js microservices on Linux hardware',
      'AWS multi-tenant firmware delivery pipeline',
      'Angular + .NET — Remote Monitoring system',
    ],
    cta: 'Explore Projects',
    glowClass: 'bg-brand/12',
    borderHover: 'hover:border-brand/50',
    ctaClass:
      'bg-brand hover:bg-brand-700 text-white shadow-teal-md hover:shadow-teal-lg',
    iconBg: 'bg-brand/10 text-brand',
    bulletDot: 'bg-brand',
  },
  {
    to: '/testimonials',
    eyebrow: 'Recommendations',
    icon: MessageSquare,
    headline: "Don't take\nmy word for it.",
    description:
      'Colleagues, stakeholders, and team members share what it is actually like to work with me — in their own words.',
    bullets: [
      'Feedback from direct reports, peers, and senior leadership',
      'Covers technical delivery, team coaching, and stakeholder trust',
      'Written by people who worked alongside me in production',
    ],
    cta: 'Read Recommendations',
    glowClass: 'bg-amber/10',
    borderHover: 'hover:border-amber/50',
    ctaClass:
      'bg-amber hover:bg-amber-dark text-white shadow-[0_4px_20px_rgba(232,149,109,0.32)] hover:shadow-[0_8px_40px_rgba(232,149,109,0.42)]',
    iconBg: 'bg-amber/10 text-amber',
    bulletDot: 'bg-amber',
  },
]

/**
 * Single editorial feature card.
 */
const FeatureCard = ({ card, index, sectionInView }) => {
  const {
    to, eyebrow, icon: Icon, headline, description,
    bullets, cta, glowClass, borderHover, ctaClass, iconBg, bulletDot,
  } = card

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl overflow-hidden',
        'border border-light-border dark:border-dark-border',
        'bg-light-card dark:bg-dark-elevated',
        'transition-[opacity,transform,box-shadow] duration-700',
        borderHover,
        'hover:shadow-card-lift-light dark:hover:shadow-card-lift',
        sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Ambient glow */}
      <div
        className={cn('absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[70px] pointer-events-none', glowClass)}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full p-7 md:p-8 lg:p-10">

        {/* Icon + eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
            <Icon size={17} strokeWidth={1.75} />
          </div>
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-ink-muted">
            {eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-display font-bold text-2xl md:text-3xl lg:text-[2rem] text-gray-900 dark:text-ink-primary leading-[1.15] mb-4 whitespace-pre-line"
          style={{ letterSpacing: '-0.03em' }}
        >
          {headline}
        </h2>

        {/* Description */}
        <p className="font-body text-base text-gray-600 dark:text-ink-secondary leading-relaxed mb-6">
          {description}
        </p>

        {/* Bullet highlights */}
        <ul className="flex flex-col gap-2.5 mb-8 flex-1" role="list">
          {bullets.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className={cn('mt-[7px] w-1.5 h-1.5 rounded-full shrink-0', bulletDot)} aria-hidden="true" />
              <span className="font-body text-sm text-gray-600 dark:text-ink-secondary leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to={to}
          className={cn(
            'self-start flex items-center gap-2.5 px-6 py-3.5 rounded-xl',
            'font-body font-semibold text-sm',
            'transition-[background-color,box-shadow] duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand',
            ctaClass
          )}
        >
          {cta} <ArrowRight size={15} />
        </Link>

      </div>
    </div>
  )
}

/**
 * "Proof of Work" section — two editorial cards driving visitors to
 * the Projects page and the Testimonials page.
 */
const ProofOfWorkSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="bg-light-base dark:bg-dark-base pt-0 pb-10 md:pb-14"
      aria-labelledby="pow-heading"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">

        {/* Section header */}
        <div
          className={cn(
            'mb-12 transition-[opacity,transform] duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">
            Proof of Work
          </p>
          <h2
            id="pow-heading"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-ink-primary"
            style={{ letterSpacing: '-0.03em' }}
          >
            The work speaks.{' '}
            <span className="text-brand">Go deeper.</span>
          </h2>
          <p className="mt-3 font-body text-base md:text-lg text-gray-600 dark:text-ink-secondary max-w-xl">
            Two places where you can see exactly how I build — and what the people I work with say about it.
          </p>
        </div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {CARDS.map((card, i) => (
            <FeatureCard
              key={card.to}
              card={card}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProofOfWorkSection
