import { useState, useEffect, useRef } from 'react'
import { FolderOpen } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'
import exDiagramLight from '../assets/high-level-ex-block-light.svg'
import exDiagramDark  from '../assets/high-level-ex-block-dark.svg'

/**
 * Update this array to add, edit, or remove projects.
 * Each project supports:
 *   title        — project name
 *   status       — "In Progress" | "Completed" | "Planning"
 *   role         — your role on the project
 *   description  — 2–3 sentence summary focused on architecture
 *   architecture — { client: { title, points[] }, server: { title, points[] } }
 *   stack        — array of { label, category }
 *                  categories: Frontend | Backend | Cloud | Database | DevOps | AI | Mobile | Testing | Other
 *   diagramSrc   — light-mode diagram image
 *   diagramSrcDark — dark-mode diagram image (auto-swaps on theme toggle)
 *   diagramAlt   — accessible alt text for the diagram
 */
const PROJECTS = [
  {
    title: 'EX Multigigabit Residential & Business Services Tester',
    status: 'In Progress',
    role: 'Full Stack Architect & Developer',
    description:
      'A full-stack network services test platform built on a clean client-server architecture. An Angular front-end continuously polls a Node.js REST backend for live hardware test results, while server-side microservices handle service orchestration and execution — each isolated behind a central proxy gateway for clean separation of concerns.',
    architecture: {
      client: {
        title: 'Client Architecture',
        points: [
          'Angular (TypeScript) SPA — reactive component tree renders live test data and hardware metrics in real time.',
          'Continuous REST API polling via RxJS intervals keeps the UI in sync with server state without full page reloads.',
          'Observer / Provider pattern drives reactive state propagation across the entire component tree.',
          'Swagger / OpenAPI contract defines all endpoint schemas — decouples the client team from backend implementation details.',
          'Jasmine unit and integration tests cover Angular services and component logic end-to-end.',
        ],
      },
      server: {
        title: 'Server Architecture',
        points: [
          'Node.js + TypeScript POD server hosts two independent microservices — APP1-SERVICES and APP2-TEST — each on a dedicated port.',
          'Proxy / API Gateway (Port 80) routes requests by URL prefix, decoupling the client from the underlying service topology.',
          'Inversify DI container manages dependencies within each microservice, keeping services loosely coupled and independently testable.',
          'Observer pattern on the server enables event-driven response propagation across service boundaries.',
          'Start-up & Crash Monitor probes all Node.js processes and auto-restarts any failed service via Bash scripting on Linux.',
        ],
      },
    },
    stack: [
      { label: 'Angular',         category: 'Frontend' },
      { label: 'TypeScript',      category: 'Frontend' },
      { label: 'RxJS',            category: 'Frontend' },
      { label: 'Observer Pattern',category: 'Frontend' },
      { label: 'Node.js',         category: 'Backend'  },
      { label: 'Microservices',   category: 'Backend'  },
      { label: 'Inversify DI',    category: 'Backend'  },
      { label: 'REST APIs',       category: 'Backend'  },
      { label: 'Swagger/OpenAPI', category: 'Backend'  },
      { label: 'Linux',           category: 'DevOps'   },
      { label: 'Bash Scripting',  category: 'DevOps'   },
      { label: 'Jasmine',         category: 'Testing'  },
      { label: 'Wireshark',       category: 'Testing'  },
    ],
    diagramSrc:     exDiagramLight,
    diagramSrcDark: exDiagramDark,
    diagramAlt:     'High-level block diagram of the EX Multigigabit Residential & Business Services Tester showing Angular client on the left and Node.js microservices server on the right.',
  },
  {
    title: 'GitLab DevSecOps CI/CD Automation Platform',
    status: 'Completed',
    role: 'DevOps Lead & Scrum Master',
    description:
      'A fully automated DevSecOps pipeline built on GitLab CI/CD, taking Angular and Node.js applications from code commit to production-ready Docker image — with integrated security scanning, automated regression, and zero-touch deployment stages across multiple environments.',
    architecture: {
      client: {
        title: 'Pipeline — Build & Test',
        points: [
          'GitLab CI/CD YAML pipeline with multi-stage definitions: lint → unit test → build → security scan → package.',
          'Angular front-end compiled and optimised; Jasmine and Playwright suites run headlessly inside Docker containers.',
          'GitHub Copilot and GitLab Duo accelerate AI-assisted test generation, reducing manual spec authoring by ~40%.',
          'Static code analysis and dependency vulnerability scanning baked into every merge-request pipeline.',
          'Automated regression gate blocks merge to main if coverage drops below threshold.',
        ],
      },
      server: {
        title: 'Pipeline — Package & Deploy',
        points: [
          'Docker multi-stage builds produce lean production images; versioned and pushed to GitLab Container Registry.',
          'TeamCity used for enterprise-grade build orchestration across multiple parallel agent pools.',
          'Azure DevOps boards integrated for traceability — pipeline runs linked directly to work items and releases.',
          'Bash-scripted environment promotion handles staged rollouts across dev, QA, and staging environments.',
          'SAFe 6.0 cadence: PI Planning drives pipeline milestones; Scrum of Scrums coordinates cross-team dependencies.',
        ],
      },
    },
    stack: [
      { label: 'GitLab CI/CD',    category: 'DevOps'    },
      { label: 'Docker',          category: 'DevOps'    },
      { label: 'Azure DevOps',    category: 'DevOps'    },
      { label: 'TeamCity',        category: 'DevOps'    },
      { label: 'Bash Scripting',  category: 'DevOps'    },
      { label: 'Angular',         category: 'Frontend'  },
      { label: 'TypeScript',      category: 'Frontend'  },
      { label: 'Node.js',         category: 'Backend'   },
      { label: 'Playwright',      category: 'Testing'   },
      { label: 'Jasmine',         category: 'Testing'   },
      { label: 'GitHub Copilot',  category: 'AI'        },
      { label: 'GitLab Duo',      category: 'AI'        },
      { label: 'SAFe 6.0',        category: 'Other'     },
    ],
  },
]

// Derive stable IDs from project index
const projectId = (i) => `project-${i + 1}`

/** Sticky scrollspy tab bar — only rendered when there are 2+ projects */
const ProjectNav = ({ projects, activeId, onSelect }) => {
  const navRef = useRef(null)

  // Scroll the active tab into view within the nav bar
  useEffect(() => {
    if (!navRef.current || !activeId) return
    const btn = navRef.current.querySelector(`[data-id="${activeId}"]`)
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId])

  return (
    <div id="project-nav" className="sticky top-16 z-30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="bg-light-base/95 dark:bg-dark-base/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border overflow-hidden">
        <nav
          ref={navRef}
          aria-label="Project navigation"
          className="flex items-stretch gap-1 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((project, i) => {
            const id = projectId(i)
            const isActive = activeId === id
            return (
              <button
                key={id}
                data-id={id}
                onClick={() => onSelect(id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative flex items-center gap-2.5 px-4 py-3.5 text-sm font-body font-medium',
                  'whitespace-nowrap shrink-0 transition-colors duration-200',
                  'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full',
                  'after:origin-left after:transition-transform after:duration-300 after:bg-brand',
                  isActive
                    ? 'text-brand after:scale-x-100'
                    : 'text-gray-500 dark:text-ink-muted hover:text-brand after:scale-x-0 hover:after:scale-x-100'
                )}
              >
                <span className={cn(
                  'w-5 h-5 rounded-full text-[10px] font-body font-bold flex items-center justify-center shrink-0',
                  'transition-colors duration-200',
                  isActive ? 'bg-brand text-white' : 'bg-brand/12 text-brand'
                )}>
                  {i + 1}
                </span>
                <span className="max-w-[240px] truncate">{project.title}</span>
              </button>
            )
          })}
        </nav>
        </div>
      </div>
    </div>
  )
}

const PageHeader = () => {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
    >
      <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">
        Projects
      </p>
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-ink-primary tracking-tight">
        Recent Work &<br />
        <span className="text-brand">Technical Depth</span>
      </h1>
      <p className="mt-4 text-gray-600 dark:text-ink-secondary font-body text-base md:text-lg max-w-2xl">
        A look at the projects I am currently building — the architecture decisions, tech stack choices, and the role I play in bringing them to life.
      </p>
    </div>
  )
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-5">
      <FolderOpen size={24} strokeWidth={1.5} />
    </div>
    <p className="font-display font-semibold text-lg text-gray-900 dark:text-ink-primary mb-2">
      More projects coming soon
    </p>
    <p className="font-body text-sm text-gray-600 dark:text-ink-secondary max-w-xs">
      Additional case studies and project write-ups will be added here.
    </p>
  </div>
)

/**
 * Projects page — showcases projects with sticky scrollspy tab navigation.
 */
const Projects = () => {
  const hasMultiple = PROJECTS.length > 1
  const [activeId, setActiveId] = useState(projectId(0))

  // Scrollspy: update active tab as user scrolls through project sections
  useEffect(() => {
    if (!hasMultiple) return

    const observers = PROJECTS.map((_, i) => {
      const el = document.getElementById(projectId(i))
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(projectId(i)) },
        // Fire when the top of the section crosses the 25% mark from the top
        { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    }).filter(Boolean)

    return () => observers.forEach(o => o.disconnect())
  }, [hasMultiple])

  const scrollToProject = (id) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-light-base dark:bg-dark-base">
      {/* Hero */}
      <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-amber/4 blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <PageHeader />
        </div>
      </div>

      {/* Sticky project tab nav — only when 2+ projects */}
      {hasMultiple && (
        <ProjectNav
          projects={PROJECTS}
          activeId={activeId}
          onSelect={scrollToProject}
        />
      )}

      {/* Projects list */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-24">
        {PROJECTS.length > 0 ? (
          <div className="flex flex-col gap-8">
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                id={projectId(i)}
                className={cn('scroll-mt-36', i > 0 && 'pt-1')}
              >
                <ProjectCard
                  {...project}
                  index={i}
                  projectNumber={i + 1}
                  onBackToList={hasMultiple ? () => document.getElementById('project-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) : undefined}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  )
}

export default Projects
