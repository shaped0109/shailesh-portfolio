import { Linkedin, Github, Mail, MapPin } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

const CONTACT_LINKS = [
  { label: 'LinkedIn', value: 'linkedin.com/in/shailesh-pedgaonkar', href: 'https://www.linkedin.com/in/shailesh-pedgaonkar', icon: <Linkedin size={18} strokeWidth={1.75} /> },
  { label: 'GitHub',   value: '[ADD_GITHUB_USERNAME]',                href: 'https://github.com/[ADD_GITHUB_USERNAME]',        icon: <Github size={18} strokeWidth={1.75} /> },
  { label: 'Email',    value: 'shailesh.tech.in@gmail.com',           href: 'mailto:shailesh.tech.in@gmail.com',               icon: <Mail size={18} strokeWidth={1.75} /> },
  { label: 'Location', value: 'Pune, India',                          href: null,                                               icon: <MapPin size={18} strokeWidth={1.75} /> },
]

/**
 * Contact page — form (visual only) + contact details.
 */
const Contact = () => {
  const [headerRef, headerInView] = useInView()
  const [formRef, formInView] = useInView()
  const [linksRef, linksInView] = useInView()

  return (
    <div className="bg-light-base dark:bg-dark-base">
      <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
        </div>
        <div
          ref={headerRef}
          className={cn('relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12 transition-[opacity,transform] duration-700', headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}
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

      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div
            ref={formRef}
            className={cn('lg:col-span-3 transition-[opacity,transform] duration-700 delay-100', formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}
          >
            <div className={cn('rounded-2xl p-6 md:p-8', 'bg-white dark:bg-dark-card', 'border border-light-border dark:border-dark-border')}>
              <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-ink-primary mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact details */}
          <div
            ref={linksRef}
            className={cn('lg:col-span-2 space-y-4 transition-[opacity,transform] duration-700 delay-200', linksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}
          >
            <h2 className="font-display font-semibold text-xl text-gray-900 dark:text-ink-primary mb-6">Get in Touch</h2>
            {CONTACT_LINKS.map(({ label, value, href, icon }) => (
              <div
                key={label}
                className={cn(
                  'flex items-start gap-4 rounded-xl p-4',
                  'bg-white dark:bg-dark-card',
                  'border border-light-border dark:border-dark-border',
                  href && 'hover:border-brand/40 transition-colors duration-200'
                )}
              >
                <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-body font-semibold text-gray-400 dark:text-ink-muted uppercase tracking-wider mb-1">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm font-body text-gray-700 dark:text-ink-secondary hover:text-brand transition-colors break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-body text-gray-700 dark:text-ink-secondary">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
