import CertCard from '../components/CertCard'
import useInView from '../hooks/useInView'
import { Trophy } from 'lucide-react'
import { cn } from '../utils/cn'
import safeAgilist    from '../assets/badges/safe-agilist.png'
import safeSsm        from '../assets/badges/safe-ssm.png'
import aiScrumMaster  from '../assets/badges/ai-scrum-master.png'
import puneUniversity from '../assets/badges/pune-university.png'

const CERTIFICATIONS = [
  { name: 'SAFe Agilist (SA)',               issuer: 'Scaled Agile, Inc.',           year: 'SAFe 6.0',        badge: safeAgilist },
  { name: 'SAFe Scrum Master (SSM)',         issuer: 'Scaled Agile, Inc.',           year: 'SAFe 6.0',        badge: safeSsm },
  { name: 'AI for Scrum Masters',            issuer: 'Scrum Alliance',               year: 'Microcredential', badge: aiScrumMaster },
  { name: 'Master in Computer Application', issuer: 'Pune University, Maharashtra',  year: 'Graduate Degree', badge: puneUniversity },
]

const AWARDS = [
  { title: 'EXFO Excellence — Eklavya Award', year: '2010', desc: 'Recognised for technical leadership and solution architecture on the PFM Project.' },
  { title: 'Certificate of Appreciation — Thank You Award', year: '2012 · 2016 · 2025', desc: 'Multiple awards for enhancing Wireline Protocol, successful Multilink delivery, and cross-team collaboration on EX products.' },
  { title: 'Hackathon Winner — TechXellence', year: '2018', desc: 'First place for conceptualising and designing a solution for Network Platforms with automated deployment and diagnostic capabilities.' },
]

const SectionHeader = ({ label, title, accent }) => {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={cn('mb-10 transition-[opacity,transform] duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
      <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-2">{label}</p>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-ink-primary tracking-tight">
        {title} <span className="text-brand">{accent}</span>
      </h2>
    </div>
  )
}

/**
 * Certifications page — cert cards and awards.
 */
const Certifications = () => (
  <div className="bg-light-base dark:bg-dark-base">
    <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">Credentials</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-ink-primary tracking-tight">
          Certifications &amp;<br /><span className="text-brand">Recognition</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-ink-secondary font-body text-base md:text-lg max-w-2xl">
          Verified credentials, continuous learning, and recognition earned through two decades of delivery excellence.
        </p>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pb-24 space-y-20">
      <section>
        <SectionHeader label="Certified" title="Qualifications &" accent="Credentials" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, i) => <CertCard key={cert.name} {...cert} index={i} />)}
        </div>
      </section>

      <section>
        <SectionHeader label="Recognition" title="Awards &" accent="Achievements" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AWARDS.map(({ title, year, desc }) => (
            <div
              key={title}
              className={cn(
                'rounded-2xl p-6 md:p-8',
                'bg-white dark:bg-dark-card',
                'border border-light-border dark:border-dark-border',
                'hover:border-brand/30 hover:-translate-y-1 hover:shadow-teal-sm transition-[transform,box-shadow,border-color] duration-300'
              )}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center text-amber shrink-0">
                  <Trophy size={18} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-body font-semibold text-amber uppercase tracking-wider mt-2">{year}</span>
              </div>
              <h3 className="font-display font-semibold text-base text-gray-900 dark:text-ink-primary mb-3 leading-snug">{title}</h3>
              <p className="font-body text-sm text-gray-600 dark:text-ink-secondary leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
)

export default Certifications
