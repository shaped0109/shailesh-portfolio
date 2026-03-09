import TimelineItem from '../components/TimelineItem'

const EXPERIENCE = [
  {
    company: 'EXFO',
    title: 'Technical Specialist / Technical Manager / Scrum Coach',
    dates: 'Jan 2024 – Present',
    location: 'Pune, India',
    bullets: [
      'Act as Hands-on Technical Manager for cross-functional teams delivering enterprise and mobile products.',
      'Design system architecture and review designs while contributing code across backend, frontend, and cloud services.',
      'Led full-stack development of internal and customer-facing apps and managed mobile app releases (Google Play and Apple App Store) with zero rollbacks.',
      'Architected and implemented AWS-based firmware update pipelines using S3, Lambda, API Gateway, and MySQL for secure, scalable configuration and deployment.',
      'Introduced CI/CD automation using GitLab and TeamCity, reducing release cycles from 5 days to 2 days.',
      'Introduced AI-assisted workflows for code generation, refactoring, and documentation; boosted developer throughput by 15%. Delivered Python-based AI POCs integrating OpenAI APIs and n8n for predictive analytics and automated log interpretation.',
      'Serve as key point of contact for stakeholders and customers, handling escalations and delivery.',
      'Act as Scrum Coach / Agile Lead; facilitate PI Planning and sprint ceremonies, improving predictability and reducing sprint spillover by 25%.',
      'Own and govern mobile application delivery, ensuring alignment between business goals, customer needs, and team execution.',
      'Coach Product Owners on backlog refinement, prioritization, and release readiness.',
      'Proactively identify and remove impediments, enabling teams to consistently meet sprint goals.',
    ],
  },
  {
    company: 'EXFO',
    title: 'Technical Lead / Scrum Coach / Associate Architect',
    dates: 'Apr 2016 – Dec 2023',
    location: 'Pune, India',
    bullets: [
      'Led architecture and development of network testing and monitoring products across 15+ releases.',
      'Defined architecture for the Multilink project and initiated a remote monitoring system using Angular and ASP.NET.',
      'Designed microservices-based remote monitoring systems, leveraging in-memory SQLite for high-performance data access.',
      'Implemented microservices with WCF and RESTful APIs, integrated SQLite, and developed SSH server and client using Secure Blackbox within a microservices architecture.',
      'Reviewed code, enforced engineering standards, and mentored developers on design and implementation best practices.',
      'Balanced hands-on development with Scrum leadership, improving sprint velocity by ~18% across multiple PIs.',
      'Facilitated Scrum ceremonies and coached teams on Agile principles and delivery excellence.',
      'Led Scrum of Scrums, managing dependencies across distributed teams.',
      'Acted as customer-facing delivery lead, resolving critical field issues and ensuring production stability.',
      'Strengthened collaboration between engineering, QA, DevOps, and stakeholders.',
      'Built domain expertise in telecom technologies: Ethernet (10M–800G), L2/L3 protocols, transceiver validation, WiFi, PON, and iperf3.',
    ],
  },
  {
    company: 'EXFO',
    title: 'Principal Software Developer',
    dates: 'Oct 2012 – Mar 2016',
    location: 'Pune, India',
    bullets: [
      'Led design and development of a reusable Protocol UI Framework, improving feature delivery and consistency. Delivered enhancements for CPRI, EtherBERT, iOptics, and EtherSAM modules.',
      'Designed base report architecture used across 5+ test applications.',
      'Mentored the team on coding best practices and Agile development, enhancing delivery maturity.',
    ],
  },
  {
    company: 'EXFO',
    title: 'Senior Software Developer',
    dates: 'Aug 2008 – Sep 2012',
    location: 'Pune, India',
    bullets: [
      'Developed WinForms and .NET Compact Framework apps for network testing products (OTDR, iOLM, OSA).',
      'Contributed to the Protocol UI Framework and ISDN PRI functionality.',
      'Designed base report architecture used across 5+ test applications.',
    ],
  },
  {
    company: 'DATEX',
    title: 'Handheld Application Developer',
    dates: 'Mar 2007 – Jul 2008',
    location: 'Pune, India',
    bullets: [
      'Built Windows Mobile apps with GPS and image capture capabilities.',
      'Integrated Microsoft MapPoint web services for mapping and navigation.',
    ],
  },
  {
    company: 'TECH-CITY Research & Consulting Pvt. Ltd.',
    title: 'Intern / Developer',
    dates: 'Jan 2005 – Feb 2007',
    location: 'Pune, India',
    bullets: [
      'Developed ASP.NET (C#) web applications; performed bug fixing, code reviews, and testing while managing server responsibilities.',
      'Maintained and enhanced an x-mailer product, implementing SMTP functionality using C and C++.',
      'Developed a Windows Mobile application to push and manage surveys and questionnaires, streamlining field data collection workflows.',
      'Maintained and updated customer-facing websites, ensuring uptime and content accuracy.',
    ],
  },
]

/**
 * Experience page — vertical timeline of work history.
 */
const Experience = () => (
  <div className="bg-light-base dark:bg-dark-base">
    <div className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        <p className="text-brand text-sm font-body font-semibold uppercase tracking-widest mb-3">Career</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-ink-primary tracking-tight">
          18+ Years of Building<br /><span className="text-brand">What Matters</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-ink-secondary font-body text-base md:text-lg max-w-2xl">
          A career defined by technical depth, delivery ownership, and continuous growth — from developer to architect to agile leader.
        </p>
      </div>
    </div>
    <section className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 pb-24">
      {EXPERIENCE.map((item, i) => (
        <TimelineItem key={`${item.company}-${item.dates}`} {...item} isLast={i === EXPERIENCE.length - 1} index={i} />
      ))}
    </section>
  </div>
)

export default Experience
