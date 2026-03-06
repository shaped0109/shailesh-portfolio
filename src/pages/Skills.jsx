import { Cloud, Code2, GitBranch, Database, Bot, Users, Network, TestTube } from 'lucide-react'
import SkillCard from '../components/SkillCard'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'

const SKILL_CATEGORIES = [
  { category: 'Full-Stack Development', icon: <Code2 size={18} strokeWidth={1.75} />, skills: ['Angular', 'React', 'Ionic', 'TypeScript', 'Node.js', 'C#.NET', 'ASP.NET'] },
  { category: 'Cloud & Infrastructure',  icon: <Cloud size={18} strokeWidth={1.75} />, skills: ['AWS S3', 'Lambda', 'API Gateway', 'Azure DevOps', 'GitLab DevSecOps', 'Docker'] },
  { category: 'CI/CD & DevOps',          icon: <GitBranch size={18} strokeWidth={1.75} />, skills: ['GitLab CI/CD', 'TeamCity', 'Bash Scripting', 'GitHub Actions', 'Automated Regression'] },
  { category: 'Databases & APIs',        icon: <Database size={18} strokeWidth={1.75} />, skills: ['MySQL', 'SQLite', 'REST APIs', 'OAuth2', 'Microservices', 'WCF'] },
  { category: 'AI & Automation',         icon: <Bot size={18} strokeWidth={1.75} />, skills: ['Claude Code', 'GitHub Copilot', 'GitLab Duo', 'Cursor', 'Windsurf', 'n8n', 'OpenAI APIs', 'Gemini', 'Python POCs'] },
  { category: 'Agile & Leadership',      icon: <Users size={18} strokeWidth={1.75} />, skills: ['SAFe 6.0', 'Scrum Master', 'PI Planning', 'Backlog Refinement', 'Scrum of Scrums', 'Coaching'] },
  { category: 'Telecom & Networking',    icon: <Network size={18} strokeWidth={1.75} />, skills: ['Ethernet 10M–800G', 'L2/L3 Protocols', 'WiFi', 'PON', 'iperf3', 'OTDR', 'iOLM'] },
  { category: 'Testing & Quality',       icon: <TestTube size={18} strokeWidth={1.75} />, skills: ['Jest', 'NUnit', 'Playwright', 'Postman', 'Coded UI', 'Jira', 'Confluence'] },
]

const PageHeader = () => {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={cn('transition-[opacity,transform] duration-700', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
      <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">Skills</p>
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-ink-primary tracking-tight">
        The Toolkit Behind<br /><span className="text-brand">18+ Years of Delivery</span>
      </h1>
      <p className="mt-4 text-gray-600 dark:text-ink-secondary font-body text-base md:text-lg max-w-2xl">
        Curated, battle-tested skills across the full spectrum — from architecture and cloud to agile coaching and AI-assisted development.
      </p>
    </div>
  )
}

/**
 * Skills page — grouped skill category cards.
 */
const Skills = () => (
  <div className="bg-light-base dark:bg-dark-base">
    <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12"><PageHeader /></div>
    </div>
    <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, i) => <SkillCard key={cat.category} {...cat} index={i} />)}
      </div>
    </section>
  </div>
)

export default Skills
