import { useState } from 'react'
import { cn } from '../utils/cn'

const inputBase = cn(
  'w-full rounded-xl px-4 py-3.5 text-sm font-body',
  'bg-light-card dark:bg-dark-elevated',
  'border border-light-border dark:border-dark-border',
  'text-gray-900 dark:text-ink-primary',
  'placeholder-gray-400 dark:placeholder-ink-muted',
  'focus-visible:outline-none focus-visible:border-brand transition-colors duration-200'
)

/**
 * Visual-only contact form (no backend wiring).
 */
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-body font-semibold text-gray-500 dark:text-ink-secondary uppercase tracking-wider mb-2">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Your full name" value={form.name} onChange={handleChange} className={inputBase} />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-body font-semibold text-gray-500 dark:text-ink-secondary uppercase tracking-wider mb-2">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="your@email.com" value={form.email} onChange={handleChange} className={inputBase} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-body font-semibold text-gray-500 dark:text-ink-secondary uppercase tracking-wider mb-2">Message</label>
        <textarea id="message" name="message" rows={5} placeholder="Tell me about the opportunity or project..." value={form.message} onChange={handleChange} className={cn(inputBase, 'resize-none')} />
      </div>
    </form>
  )
}

export default ContactForm
