import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'
import {
  SiAngular, SiReact, SiIonic, SiTypescript, SiNodedotjs,
  SiDotnet, SiGitlab, SiDocker, SiGithubactions,
  SiMysql, SiSqlite, SiJest, SiPostman,
  SiJira, SiConfluence, SiOpenai, SiPython, SiN8N,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

/** Map skill label → react-icon component */
const SKILL_ICON_MAP = {
  'Angular':          <SiAngular className="text-[#DD0031]" />,
  'React':            <SiReact className="text-[#61DAFB]" />,
  'Ionic':            <SiIonic className="text-[#3880FF]" />,
  'TypeScript':       <SiTypescript className="text-[#3178C6]" />,
  'Node.js':          <SiNodedotjs className="text-[#339933]" />,
  'C#.NET':           <SiDotnet className="text-[#512BD4]" />,
  'ASP.NET':          <SiDotnet className="text-[#512BD4]" />,
  'AWS S3':           <FaAws className="text-[#FF9900]" />,
  'Lambda':           <FaAws className="text-[#FF9900]" />,
  'API Gateway':      <FaAws className="text-[#FF9900]" />,
  'GitLab DevSecOps': <SiGitlab className="text-[#FC6D26]" />,
  'Docker':           <SiDocker className="text-[#2496ED]" />,
  'GitLab CI/CD':     <SiGitlab className="text-[#FC6D26]" />,
  'GitHub Actions':   <SiGithubactions className="text-[#2088FF]" />,
  'MySQL':            <SiMysql className="text-[#4479A1]" />,
  'SQLite':           <SiSqlite className="text-[#003B57]" />,
  'OpenAI APIs':      <SiOpenai className="text-[#412991]" />,
  'Python POCs':      <SiPython className="text-[#3776AB]" />,
  'n8n':              <SiN8N className="text-[#EA4B71]" />,
  'Jest':             <SiJest className="text-[#C21325]" />,
  'Postman':          <SiPostman className="text-[#FF6C37]" />,
  'Jira':             <SiJira className="text-[#0052CC]" />,
  'Confluence':       <SiConfluence className="text-[#172B4D]" />,
}

/**
 * Single skill category card with curated skill tags.
 * @param {{ category: string, icon: React.ReactNode, skills: string[], index?: number }} props
 */
const SkillCard = ({ category, icon, skills, index = 0 }) => {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl p-6 md:p-8',
        'bg-white dark:bg-dark-card',
        'border border-light-border dark:border-dark-border',
        'shadow-card-light dark:shadow-card-dark',
        'hover:shadow-teal-md hover:-translate-y-1',
        'transition-[transform,box-shadow] duration-300 opacity-0',
        inView && 'animate-fade-up opacity-100'
      )}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center text-brand shrink-0">
          {icon}
        </div>
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-ink-primary">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const logo = SKILL_ICON_MAP[skill]
          return (
            <span
              key={skill}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body font-medium',
                'bg-light-card dark:bg-dark-elevated',
                'text-gray-700 dark:text-ink-secondary',
                'border border-light-border dark:border-dark-border',
                'hover:border-brand/50 hover:text-brand transition-colors duration-200'
              )}
            >
              {logo && <span className="text-base leading-none">{logo}</span>}
              {skill}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default SkillCard
