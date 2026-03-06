import { Link } from 'react-router-dom'
import { Linkedin, Mail } from 'lucide-react'
import { cn } from '../utils/cn'

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shailesh-pedgaonkar', icon: <Linkedin size={18} strokeWidth={1.75} /> },
{ label: 'Email',    href: 'mailto:shailesh.tech.in@gmail.com',                icon: <Mail size={18} strokeWidth={1.75} /> },
]

/**
 * Site footer with name, tagline, social links, and copyright.
 */
const Footer = () => (
  <footer className="border-t border-light-border dark:border-dark-border bg-light-base dark:bg-dark-base">
    <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <Link to="/" className="font-display font-bold text-base text-gray-900 dark:text-ink-primary hover:text-brand transition-colors">
            Shailesh Pedgaonkar
          </Link>
          <p className="text-xs text-gray-500 dark:text-ink-muted font-body mt-0.5">
            Technical Specialist · Agile Leader · SAFe Scrum Master
          </p>
        </div>
        <div className="flex items-center gap-3">
          {SOCIAL.map(({ label, href, icon }) => (
            <a
              key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-full',
                'border border-light-border dark:border-dark-border',
                'text-gray-600 dark:text-ink-secondary hover:text-brand hover:border-brand/40',
                'transition-colors duration-200'
              )}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-gray-400 dark:text-ink-muted font-body">
        © {new Date().getFullYear()} Shailesh Pedgaonkar. All rights reserved.
      </p>
    </div>
  </footer>
)

export default Footer
