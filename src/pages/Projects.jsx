import { useState, useEffect, useRef } from 'react'
import { FolderOpen } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import useInView from '../hooks/useInView'
import { cn } from '../utils/cn'
import exDiagramLight from '../assets/high-level-ex-block-light.svg'
import exDiagramDark  from '../assets/high-level-ex-block-dark.svg'
import exFirmwareLight from '../assets/ex-firware-update-light.svg'
import exFirmwareDark  from '../assets/ex-firware-update-dark.svg'

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
    role: 'Technical Specialist, Tech Lead & Scrum Master',
    description:
      'A full-stack network services test platform built on a clean client-server architecture. An Angular front-end continuously polls a Node.js REST backend for live hardware test results, while server-side microservices handle service orchestration and execution — each isolated behind a central proxy gateway for clean separation of concerns.',
    architecture: {
      client: {
        title: 'Client Architecture',
        points: [
          'Angular (TypeScript) SPA — reactive components live test data and hardware metrics in real time.',
          'Continuous REST API polling keeps the UI in sync with server/pod side state without full page reloads.',
          'Observer / Provider pattern drives reactive state propagation across the entire component tree.',
          'Swagger / OpenAPI contract defines all endpoint schemas — decouples the client team from backend implementation details.',
          'Jasmine unit and integration tests cover Angular services and component logic end-to-end.',
        ],
      },
      server: {
        title: 'Server Architecture',
        points: [
          'Node.js (TypeScript) — POD server hosts two independent microservices — APP1-SERVICES and APP2-TEST — each on a dedicated port.',
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
    title: 'Firmware Update & Cloud Data Pipeline — EX Field Device Platform',
    status: 'Completed',
    role: 'Technical Specialist, Tech Lead & Scrum Master',
    description:
      'A multi-tenant firmware delivery pipeline built on AWS, enabling secure over-the-air firmware updates to field device pods via tenant-isolated S3 buckets and pre-signed URLs. Field devices authenticate using TLS certificates and write structured test reports directly to a SaaS-owned S3 bucket, bypassing intermediate compute for the reporting path. The architecture enforces strict operator isolation at the IAM, Lambda, and database layers across Operator A, B, and C tenants.',
    architecture: {
      client: {
        title: 'Field Layer — Device & Mobile',
        points: [
          'Field device pods/hardware capture test metrics (PON Test, Ookla Speedtests, and Wi-Fi tests), packaging results as PDF, JSON, XML, or CSV reports.',
          'A Node.js/Express Firmware Update Service runs on each pod, reading a burned-in device_id from ROM and initiating authenticated firmware update requests via REST.',
          'Device identity is established using TLS mutual authentication — each pod holds a unique certificate in secure hardware, verified against a private CA before any cloud request is made.',
          'A Technician Mobile App (iOS/Android) triggers firmware update flows and receives result feedback; report data is pushed directly from the pod to the SaaS S3 Reports Bucket via presigned PUT URL.',
          'A Multi-Tenant Policy Engine on the client enforces per-operator versioning, scheduling, and compliance rules for Operator A, B, and C before any update request is dispatched.'
        ],
      },
      server: {
        title: 'Cloud Layer — AWS Processing & SaaS Platform',
        points: [
          'All firmware update requests enter via Amazon API Gateway over HTTPS, passing through AWS WAF (DDoS/injection protection) and AWS Cognito/IAM for device identity verification before reaching Lambda.',
          'A Lambda Firmware API function validates the incoming device_id against a MySQL RDS Device Registry DB, then routes the request to the correct tenant-isolated S3 firmware bucket (/tenant-a/firmware/, /tenant-b/firmware/, /tenant-c/firmware/) — cross-tenant access is denied at the IAM level.',
          'Validated firmware binaries are returned to the pod via a short-lived S3 pre-signed GET URL (TTL 15 minutes), scoped per tenant — the pod downloads directly from S3 without proxying through Lambda.',
          'The SaaS Platform owns the Reports S3 bucket and exposes a Sync Connector (OAuth2/Webhook) that reads from MySQL metadata to drive Fleet Analytics dashboards and zero-touch Auto Onboarding for new devices.',
        ],
      },
    },
    stack: [
      { label: 'Node.js',            category: 'Backend'   },
      { label: 'Express',            category: 'Backend'   },
      { label: 'AWS Lambda',         category: 'Cloud'     },
      { label: 'Amazon API Gateway', category: 'Cloud'     },
      { label: 'Amazon S3',          category: 'Cloud'     },
      { label: 'AWS Cognito',        category: 'Cloud'     },
      { label: 'AWS WAF',            category: 'Cloud'     },
      { label: 'AWS SNS',            category: 'Cloud'     },
      { label: 'AWS IAM',            category: 'Cloud'     },
      { label: 'MySQL (RDS)',        category: 'Database'  },
      { label: 'mTLS / X.509',       category: 'Other'     },
      { label: 'OAuth2',             category: 'Other'     },
      { label: 'Webhook',            category: 'Other'     },
      { label: 'REST / HTTPS',       category: 'Other'     },
      { label: 'iOS / Android',      category: 'Mobile'    },
      { label: 'SaaS Sync Platform', category: 'Other'     },
    ],
    diagramSrc:     exFirmwareLight,
    diagramSrcDark: exFirmwareDark,
    diagramAlt:
      'Architecture diagram showing a multi-tenant IoT firmware update and cloud data pipeline. Left zone shows field device pods and mobile app connecting to a Node.js firmware update service with mTLS auth and ROM-based device identity. Centre-left shows AWS ingress via API Gateway, WAF, and Cognito. Centre-right shows AWS Lambda functions routing to tenant-isolated S3 firmware buckets for Operator A, B, and C, with pre-signed URL delivery back to the pod and a Lambda Normalize function indexing report metadata into MySQL RDS. Right zone shows a SaaS platform with an S3 reports bucket, sync connector, fleet analytics, and auto onboarding.',
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
