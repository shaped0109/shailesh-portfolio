import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Shield, Zap, Bot } from 'lucide-react'
import { cn } from '../utils/cn'
import { TESTIMONIALS } from '../data/testimonials'

const ROLES = [
  'Technical Manager',
  'SAFe Scrum Master',
  'Hands-on Engineer',
  'Agile Delivery Leader',
]

const PILLARS = [
  {
    icon: Shield,
    title: 'Engineering Lead',
    tags: ['Angular', 'React', 'Node', '.NET', 'AWS', 'CI/CD', 'TypeScript'],
  },
  {
    icon: Zap,
    title: 'SAFe Scrum Master',
    tags: ['SAFe 6.0', 'Scrum Coach', 'PI Planning', 'Scrum of Scrums'],
  },
  {
    icon: Bot,
    title: 'AI Practitioner',
    tags: ['Claude', 'Gemini', 'OpenAI', 'GitLab Duo', 'Copilot', 'n8n'],
  },
]

const PROOF_POINTS = [
  { value: '18+', label: 'years of hands-on delivery' },
  { value: '15+', label: 'products shipped to production' },
  { value: '2d', label: 'sprint-to-release cycle' },
  { value: '0', label: 'post-release rollbacks' },
]

const AWARDS = [
  'EXFO Excellence Award',
  'Hackathon Winner 2018',
  'Certificate of Appreciation ×3',
  'SAFe 6.0 Certified',
]

/**
 * Editorial pull-quote testimonial — inline between bio and proof points.
 */
const HeroTestimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActiveIndex(i => (i + 1) % TESTIMONIALS.length)
        setVisible(true)
      }, 350)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const active = TESTIMONIALS[activeIndex]
  const initials = active.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="flex gap-5 items-stretch max-w-2xl">
      {/* Left accent bar */}
      <div className="w-0.5 shrink-0 rounded-full bg-brand" />

      <div className="flex flex-col gap-4 py-1">
        {/* Quote — fixed height prevents layout shift between slides */}
        <div className="min-h-[5rem] md:min-h-[6rem]">
          <p
            className={cn(
              'font-display font-semibold italic text-xl md:text-2xl text-gray-900 dark:text-ink-primary leading-snug',
              'transition-opacity duration-350',
              visible ? 'opacity-100' : 'opacity-0'
            )}
            style={{ letterSpacing: '-0.025em' }}
          >
            &ldquo;{active.quote}&rdquo;
          </p>
        </div>

        {/* Attribution + dots row */}
        <div
          className={cn(
            'flex items-center justify-between gap-4 transition-opacity duration-350',
            visible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-display font-bold',
              'bg-brand/10 text-brand border border-brand/20'
            )}>
              {initials}
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-gray-900 dark:text-ink-primary leading-tight">
                {active.name}
              </p>
              <p className="font-body text-xs text-gray-500 dark:text-ink-muted leading-tight mt-0.5">
                {active.title} · {active.company}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setVisible(false)
                  setTimeout(() => { setActiveIndex(i); setVisible(true) }, 350)
                }}
                aria-label={`View testimonial ${i + 1}`}
                className={cn(
                  'rounded-full transition-[width,background-color] duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  i === activeIndex
                    ? 'w-5 h-1.5 bg-brand'
                    : 'w-1.5 h-1.5 bg-gray-300 dark:bg-dark-muted hover:bg-brand/50'
                )}
              />
            ))}
          </div>
        </div>

        {/* Link */}
        <Link
          to="/testimonials"
          className="self-start text-xs font-body text-gray-400 dark:text-ink-muted hover:text-brand transition-colors duration-150 focus-visible:outline-none"
        >
          Recommendations →
        </Link>
      </div>
    </div>
  )
}

/**
 * Full-viewport hero section — left content + right testimonial panel.
 */
const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % ROLES.length)
        setRoleVisible(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={cn(
      'relative min-h-screen flex flex-col justify-center overflow-hidden',
      'bg-light-base dark:bg-dark-base pt-28 pb-0'
    )}>

      {/* Background gradients + grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-brand/8 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-amber/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-brand/4 blur-[200px]" />
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 w-full">

        {/* Single-column layout */}
        <div>

          {/* ── Main content ── */}
          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-brand/30 bg-brand/8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-body font-semibold text-brand tracking-widest uppercase">
                Open to Senior Roles &amp; Advisory
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display font-bold text-gray-900 dark:text-ink-primary text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1.0] mb-5 animate-fade-up"
              style={{ animationDelay: '100ms', letterSpacing: '-0.04em' }}
            >
              Shailesh<br />
              <span className="text-brand">Pedgaonkar</span>
            </h1>

            {/* Animated role rotator */}
            <div
              className="flex items-center gap-3 mb-8 animate-fade-up"
              style={{ animationDelay: '180ms' }}
            >
              <span className="font-body text-xs text-gray-500 dark:text-ink-muted uppercase tracking-widest">I am a</span>
              <span className="w-8 h-px bg-brand/40" />
              <span
                className={cn(
                  'font-display font-semibold text-lg md:text-xl text-brand',
                  'transition-opacity duration-300',
                  roleVisible ? 'opacity-100' : 'opacity-0'
                )}
              >
                {ROLES[roleIndex]}
              </span>
            </div>

            {/* Tagline */}
            <p
              className="font-display font-semibold text-2xl md:text-3xl lg:text-[2rem] xl:text-4xl text-gray-900 dark:text-ink-primary leading-[1.2] mb-7 animate-fade-up"
              style={{ animationDelay: '260ms', letterSpacing: '-0.03em' }}
            >
              I write the code,{' '}
              <span className="text-brand">lead the team,</span>{' '}
              and own the delivery — end to end.
            </p>

            {/* Awards / credibility strip — above bio for immediate visibility */}
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <span className="font-body text-xs text-gray-400 dark:text-ink-muted uppercase tracking-widest">
                Recognised by
              </span>
              {AWARDS.map(award => (
                <span
                  key={award}
                  className="flex items-center gap-1.5 font-body text-xs text-gray-500 dark:text-ink-secondary"
                >
                  <span className="text-amber" aria-hidden="true">✦</span>
                  {award}
                </span>
              ))}
            </div>

            {/* Bio paragraph — single, tight */}
            <p
              className="font-body text-base md:text-lg text-gray-600 dark:text-ink-secondary leading-relaxed max-w-3xl mb-10 animate-fade-up"
              style={{ animationDelay: '340ms' }}
            >
              Hands-on{' '}
              Technical Manager / Technical Specialist{' '}
              with 18+ years{' '}
              delivering production-grade desktop, web and mobile systems — full-stack (Angular, Ionic, React, Node.js, .NET),
              cloud-enabled, CI/CD-driven. Actively codes, owns architecture, and serves as the{' '}
              single point of accountability{' '}
              for delivery and stakeholders — while coaching teams toward continuous improvement.
            </p>

            {/* Pull-quote testimonial */}
            <div
              className="mb-10 animate-fade-up"
              style={{ animationDelay: '380ms' }}
            >
              <HeroTestimonial />
            </div>

            {/* Identity pillars */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12 animate-fade-up"
              style={{ animationDelay: '460ms' }}
            >
              {PILLARS.map(({ icon: Icon, title, tags }) => (
                <div
                  key={title}
                  className={cn(
                    'p-4 rounded-xl border border-light-border dark:border-dark-muted',
                    'bg-light-card dark:bg-dark-elevated',
                    'hover:border-brand/40 hover:bg-brand/4 transition-colors duration-200'
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 rounded-md bg-brand/10">
                      <Icon size={13} className="text-brand" />
                    </div>
                    <span className="font-display font-semibold text-sm text-gray-900 dark:text-ink-primary">
                      {title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-body',
                          'text-gray-700 dark:text-ink-secondary',
                          'bg-light-surface dark:bg-dark-surface',
                          'border border-light-border dark:border-dark-muted'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-4 mb-14 animate-fade-up"
              style={{ animationDelay: '540ms' }}
            >
              <Link
                to="/experience"
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-brand hover:bg-brand-700 text-white font-body font-semibold text-sm shadow-teal-md hover:shadow-teal-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                View My Work <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className={cn(
                  'flex items-center gap-2.5 px-7 py-4 rounded-xl font-body font-semibold text-sm',
                  'border border-light-border dark:border-dark-border',
                  'bg-light-card dark:bg-dark-elevated/40',
                  'text-gray-900 dark:text-ink-primary',
                  'hover:border-brand/50 hover:text-brand transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'
                )}
              >
                <MessageSquare size={16} /> Get In Touch
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom fade-out */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-light-base dark:from-dark-base to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}

export default HeroSection
