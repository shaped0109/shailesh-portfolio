import { Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/shailesh-pedgaonkar',
    href: 'https://www.linkedin.com/in/shailesh-pedgaonkar',
    description: 'Connect professionally',
    icon: <Linkedin size={20} strokeWidth={1.75} />,
  },
  {
    label: 'Email',
    value: 'shailesh.tech.in@gmail.com',
    href: 'mailto:shailesh.tech.in@gmail.com',
    description: 'Best way to reach me',
    icon: <Mail size={20} strokeWidth={1.75} />,
  },
  {
    label: 'Location',
    value: 'Pune, India',
    href: null,
    description: 'Open to remote opportunities',
    icon: <MapPin size={20} strokeWidth={1.75} />,
  },
]

/**
 * Contact page — availability status + contact method cards.
 */
const Contact = () => {
  const [headerRef, headerInView] = useInView()
  const [cardsRef, cardsInView] = useInView()

  return (
    <div className="bg-light-base dark:bg-dark-base">
      {/* Hero */}
      <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand/4 blur-[100px]" />
        </div>
        <div
          ref={headerRef}
          className={cn(
            'relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12 transition-[opacity,transform] duration-700',
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">Contact</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-ink-primary tracking-tight">
            Let's Build Something<br /><span className="text-brand">Worth Building</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-ink-secondary font-body text-base md:text-lg max-w-2xl">
            Available for senior roles, consulting, and advisory positions.
          </p>
        </div>
      </div>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pb-32">
        {/* Availability badge */}
        <div className="flex items-center gap-2.5 mb-12">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-body text-gray-500 dark:text-ink-secondary">Currently open to new opportunities</span>
        </div>

        {/* Contact method cards */}
        <div
          ref={cardsRef}
          className={cn(
            'grid grid-cols-1 md:grid-cols-3 gap-6 transition-[opacity,transform] duration-700',
            cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          {CONTACT_LINKS.map(({ label, value, href, description, icon }, i) => (
            <div
              key={label}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={cn(
                'group rounded-2xl p-6 border',
                'bg-white dark:bg-dark-card',
                'border-light-border dark:border-dark-border',
                href && 'hover:border-brand/40 hover:shadow-teal-md transition-[border-color,box-shadow] duration-200'
              )}
            >
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                      {icon}
                    </div>
                    <ArrowUpRight size={16} className="text-gray-400 dark:text-ink-muted group-hover:text-brand transition-colors duration-200" />
                  </div>
                  <p className="text-xs font-body font-semibold text-gray-400 dark:text-ink-muted uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-body font-medium text-gray-900 dark:text-ink-primary break-all mb-1">{value}</p>
                  <p className="text-xs font-body text-gray-500 dark:text-ink-muted mt-auto pt-3">{description}</p>
                </a>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                      {icon}
                    </div>
                  </div>
                  <p className="text-xs font-body font-semibold text-gray-400 dark:text-ink-muted uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-body font-medium text-gray-900 dark:text-ink-primary mb-1">{value}</p>
                  <p className="text-xs font-body text-gray-500 dark:text-ink-muted mt-auto pt-3">{description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contact
