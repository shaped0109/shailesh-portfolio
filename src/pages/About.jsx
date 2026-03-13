import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'
import shaileshPhoto from '../assets/shailesh-photo.png'
import { Code2, Layers, GitBranch, Users, Cpu } from 'lucide-react'

const VALUE_PROPOSITIONS = [
  {
    icon: Code2,
    title: 'I Code. I Lead. I Ship.',
    desc: 'Not a proxy manager — I actively write code every sprint, review designs, debug production issues, and own architectural decisions alongside my team.',
  },
  {
    icon: GitBranch,
    title: 'Delivery That Ships',
    desc: '15+ products shipped to production. 3 mobile apps. Zero post-release rollbacks. CI/CD automation (GitLab, TeamCity, AWS) cut release cycles from 5 to 2 days.',
  },
  {
    icon: Users,
    title: 'Agile at Scale',
    desc: 'SAFe 6.0 certified Agilist and Scrum Master. Led PI Planning and iteration execution across cross-functional teams, improving delivery predictability by 13% across two PIs.',
  },
]

const TECH_AREAS = [
  {
    icon: Layers,
    label: 'Frontend',
    items: ['Angular', 'React', 'Ionic', 'TypeScript', 'HTML/CSS'],
  },
  {
    icon: Cpu,
    label: 'Backend & Cloud',
    items: ['Node.js', '.NET', 'AWS', 'REST APIs', 'Microservices'],
  },
  {
    icon: GitBranch,
    label: 'DevOps & AI',
    items: ['GitLab CI/CD', 'TeamCity', 'OpenAI', 'Gemini', 'Claude Code', 'GitLab Duo', 'Cursor', 'Windsurf', 'VS Code + Copilot', 'n8n'],
  },
]

const HIGHLIGHTS = [
  { value: '15+', label: 'Products shipped to production' },
  { value: '3', label: 'Mobile apps delivered' },
  { value: '5→2', label: 'Release cycle (days)' },
  { value: '13%', label: 'Delivery predictability gain' },
  { value: '0', label: 'Post-release rollbacks' },
  { value: '18+', label: 'Years hands-on in IT' },
]

const Section = ({ children, className, index = 0 }) => {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  )
}

/**
 * About page — engineering-first bio, tech stack, highlights, and value propositions.
 */
const About = () => (
  <div className="bg-light-base dark:bg-dark-base">
    {/* Page header */}
    <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">About</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-ink-primary tracking-tight">
          The Engineer Behind<br />
          <span className="text-brand">the Manager</span>
        </h1>
      </div>
    </div>

    {/* Content */}
    <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pb-24">

      {/* Bio + headshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
        {/* Photo */}
        <Section index={0} className="order-first lg:order-last">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/20 to-amber/10 blur-xl scale-105" />
            <img
              src={shaileshPhoto}
              alt="Shailesh Pedgaonkar — Technical Manager, Hands-on Engineer and SAFe Scrum Coach"
              className="relative w-full max-w-sm mx-auto lg:max-w-full rounded-full object-cover aspect-square shadow-teal-lg"
              loading="lazy"
            />
          </div>
        </Section>

        {/* Bio paragraphs */}
        <div className="space-y-6">
          {[
            {
              text: (
                <>
                  I'm <strong className="font-semibold text-gray-900 dark:text-ink-primary">Shailesh Pedgaonkar</strong> — a hands-on{' '}
                  Technical Manager, Technical Specialist and Scrum Coach{' '}
                  with 18+ years delivering production-grade web and mobile solutions. I'm not the kind of manager who stops coding — I write code,
                  review architecture, debug production issues, and stay in the technical trenches alongside my team.
                </>
              ),
            },
            {
              text: "Most of my career has been at EXFO, where I progressed from software developer to Technical Specialist, contributing to network testing products used by global telecom operators. Along the way, I've designed microservices architectures, built AWS cloud pipelines, managed mobile app releases, and coached Agile teams across PI Planning cycles.",
            },
            {
              text: "I hold an MCA from Pune University and am certified as a SAFe 6.0 Agilist, SAFe Scrum Master, and an AI for Scrum Masters practitioner. I believe technology is only as good as the people and processes behind it — which is why I invest equally in engineering quality and team psychological safety.",
            },
            {
              text: "Outside formal roles, I'm fascinated by AI-assisted development, exploring tools like Claude Code, Windsurf, Cursor, GitLab Duo, and n8n automation. I'm a Hackathon winner and a multiple-time recipient of EXFO's Excellence and Appreciation Awards.",
            },
          ].map(({ text }, i) => (
            <Section key={i} index={i + 1}>
              <p className="font-body text-base md:text-lg text-gray-600 dark:text-ink-secondary leading-relaxed">
                {text}
              </p>
            </Section>
          ))}
        </div>
      </div>

      {/* By the Numbers */}
      <Section className="mb-16">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-ink-primary tracking-tight mb-8">
          By the Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {HIGHLIGHTS.map(({ value, label }, i) => (
            <Section key={label} index={i}>
              <div className={cn(
                'rounded-xl p-4 text-center',
                'bg-white dark:bg-dark-card',
                'border border-light-border dark:border-dark-border',
                'hover:border-brand/30 transition-colors duration-200'
              )}>
                <span
                  className="block font-display font-bold text-2xl md:text-3xl text-brand mb-1"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {value}
                </span>
                <span className="font-body text-xs text-gray-500 dark:text-ink-secondary leading-tight">
                  {label}
                </span>
              </div>
            </Section>
          ))}
        </div>
      </Section>

      {/* What I Bring */}
      <Section className="mb-16">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-ink-primary tracking-tight mb-10">
          What I Bring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPOSITIONS.map(({ icon: Icon, title, desc }, i) => (
            <Section key={title} index={i}>
              <div className={cn(
                'rounded-2xl p-6 md:p-8 h-full',
                'bg-white dark:bg-dark-card',
                'border border-light-border dark:border-dark-border',
                'hover:border-brand/30 hover:-translate-y-1 hover:shadow-teal-sm',
                'transition-[transform,box-shadow,border-color] duration-300'
              )}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand/10">
                    <Icon size={16} className="text-brand" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-gray-900 dark:text-ink-primary">{title}</h3>
                </div>
                <p className="font-body text-sm text-gray-600 dark:text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </Section>

      {/* Core Tech Stack */}
      <Section className="mb-16">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-ink-primary tracking-tight mb-8">
          Core Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_AREAS.map(({ icon: Icon, label, items }, i) => (
            <Section key={label} index={i}>
              <div className={cn(
                'rounded-2xl p-6 h-full',
                'bg-white dark:bg-dark-card',
                'border border-light-border dark:border-dark-border'
              )}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-brand/10">
                    <Icon size={14} className="text-brand" />
                  </div>
                  <span className="font-display font-semibold text-sm text-gray-900 dark:text-ink-primary uppercase tracking-widest">
                    {label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span
                      key={item}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-xs font-body font-medium',
                        'text-gray-600 dark:text-ink-secondary',
                        'bg-light-base dark:bg-dark-base',
                        'border border-light-border dark:border-dark-border'
                      )}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </Section>

      {/* Education + Certifications */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div className={cn(
            'rounded-2xl p-6 md:p-8',
            'bg-white dark:bg-dark-card',
            'border border-light-border dark:border-dark-border'
          )}>
            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-ink-primary tracking-tight mb-5">Education</h2>
            <div className="flex items-start gap-4">
              <div className="w-1 min-h-[3rem] rounded-full bg-brand shrink-0 mt-1" />
              <div>
                <p className="font-display font-semibold text-base text-gray-900 dark:text-ink-primary">
                  Master in Computer Application (MCA)
                </p>
                <p className="text-sm text-gray-600 dark:text-ink-secondary font-body mt-1">
                  Pune University, Maharashtra, India
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className={cn(
            'rounded-2xl p-6 md:p-8',
            'bg-white dark:bg-dark-card',
            'border border-light-border dark:border-dark-border'
          )}>
            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-ink-primary tracking-tight mb-5">Certifications</h2>
            <div className="space-y-3">
              {[
                'SAFe 6.0 Certified Agilist',
                'SAFe Scrum Master (SSM)',
                'AI for Scrum Masters',
              ].map(cert => (
                <div key={cert} className="flex items-start gap-3">
                  <div className="w-1 h-5 rounded-full bg-brand shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-gray-700 dark:text-ink-secondary">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

    </section>
  </div>
)

export default About
