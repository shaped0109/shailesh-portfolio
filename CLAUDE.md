# CLAUDE.md — React + Vite + Tailwind + React Router Development Rules

> This file configures Claude's behavior for every frontend session in this project.
> Stack: React 18 · Vite · Tailwind CSS v3 · React Router v6
> All rules are mandatory unless explicitly overridden by the user in the conversation.

---

## 1. Session Initialization (Always Do First)

- **Load the `frontend-design` skill** before writing any frontend code — every session, no exceptions.
- Scan the `brand_assets/` folder at the start of every session, even if you think nothing has changed.
- Review this entire `CLAUDE.md` before taking any action.
- Confirm the tech stack in use: **React 18 + Vite + Tailwind CSS v3 + React Router v6**
- Never default to static HTML output. Every deliverable is a React component or page.

---

## 2. Project Structure

Always follow this folder structure. Never deviate without user approval.

```
your-project/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/          ← Reusable UI pieces (Navbar, Footer, Button, Card, etc.)
│   │   └── ui/              ← Smallest atomic components (inputs, badges, avatars)
│   ├── pages/               ← Full page views tied to routes
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── layouts/             ← Shared page wrappers (MainLayout, AuthLayout, etc.)
│   ├── hooks/               ← Custom React hooks (useScroll, useMediaQuery, etc.)
│   ├── context/             ← React Context providers (ThemeContext, AuthContext, etc.)
│   ├── assets/              ← Images, fonts, SVGs
│   ├── styles/              ← Global CSS, Tailwind base overrides
│   │   └── globals.css
│   ├── utils/               ← Pure helper functions (formatDate, cn, etc.)
│   ├── App.jsx              ← Root component + all route definitions
│   └── main.jsx             ← Vite entry point, renders <App /> into DOM
├── brand_assets/            ← Logos, color guides, style guides (do not modify)
├── index.html               ← Vite's single HTML shell (do not add inline styles here)
├── vite.config.js           ← Vite configuration
├── tailwind.config.js       ← Tailwind configuration with custom theme tokens
├── postcss.config.js        ← PostCSS config for Tailwind
├── .eslintrc.cjs            ← ESLint rules
├── CLAUDE.md                ← This file
└── package.json
```

---

## 3. Tech Stack Rules

### React 18
- Use **functional components only** — never class components.
- Use hooks for all state and side effects (`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`).
- Every component file uses `.jsx` extension.
- One component per file — no exceptions.
- Component names are **PascalCase** (e.g., `HeroSection`, `NavBar`, `ProductCard`).
- Prop names are **camelCase** (e.g., `onClick`, `isVisible`, `userData`).
- Always define PropTypes or use JSDoc comments to document props.
- Never use `index.jsx` as a component name — always use descriptive names.

### Vite
- Dev server runs on **`http://localhost:5173`** (Vite default).
- Start with: `npm run dev`
- Build for production with: `npm run build`
- Preview production build with: `npm run preview`
- Never manually edit `vite.config.js` unless the user requests it.
- Use Vite's `import.meta.env` for environment variables — never `process.env`.

### Tailwind CSS v3
- Installed via **npm** — never use CDN script tag in React projects.
- All custom brand colors, fonts, and spacing tokens go in `tailwind.config.js` under `theme.extend`.
- Use Tailwind utility classes directly in JSX `className` props.
- For complex conditional classes, use the `cn()` utility (clsx + tailwind-merge).
- Never write raw CSS unless absolutely necessary. If needed, place it in `src/styles/globals.css`.
- Never use `@apply` for component styles — use className directly.
- Responsive classes follow mobile-first order: `base → sm: → md: → lg: → xl:`

### React Router v6
- All routes defined in `src/App.jsx` using `<BrowserRouter>`, `<Routes>`, and `<Route>`.
- Use `<Link>` and `<NavLink>` for all internal navigation — never use `<a href>` for internal links.
- Use `useNavigate()` for programmatic navigation.
- Use `useParams()` for dynamic route parameters.
- Use `<Outlet />` for nested route layouts.
- 404 handling: always include a `<Route path="*" element={<NotFound />} />` catch-all route.
- Lazy load pages using `React.lazy()` and `<Suspense>` for better performance.

---

## 4. Component Architecture Rules

### Component Categories
| Type | Location | Purpose | Example |
|------|----------|---------|---------|
| Page | `src/pages/` | Full route view | `Home.jsx`, `About.jsx` |
| Layout | `src/layouts/` | Shared wrappers | `MainLayout.jsx` |
| Feature | `src/components/` | Section-level UI | `HeroSection.jsx`, `TestimonialGrid.jsx` |
| UI | `src/components/ui/` | Atomic elements | `Button.jsx`, `Badge.jsx`, `Input.jsx` |

### Component Rules
- Every page component wraps its content in the appropriate layout.
- Layouts contain `<Navbar />`, `<Footer />`, and `<Outlet />` (or `{children}`).
- Never hardcode content in layout components — pass via props or slots.
- Keep components focused — if a component exceeds ~150 lines, split it.
- Extract repeated JSX patterns into reusable components immediately.

### Props Rules
- Every reusable component must have sensible default props.
- Boolean props use `is` or `has` prefix (e.g., `isActive`, `hasError`, `isLoading`).
- Event handler props use `on` prefix (e.g., `onClick`, `onSubmit`, `onChange`).
- Never pass raw objects as props if a specific shape is needed — destructure clearly.

---

## 5. Responsive Design Rules

### Breakpoints (Tailwind defaults — always mobile-first)
| Prefix | Min Width | Target |
|--------|-----------|--------|
| (none) | 0px | Mobile phones (375px base) |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets (portrait) |
| `lg:` | 1024px | Tablets (landscape) / Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large monitors |

### Responsive Rules
- Always design **mobile-first** — base styles target 375px screens.
- Every layout must be tested and functional at: `375px`, `768px`, `1024px`, `1280px`.
- Use `flex-col` on mobile, switch to `flex-row` at `md:` or `lg:`.
- Navigation collapses to a hamburger menu on mobile (`md:hidden` / `hidden md:flex`).
- Font sizes scale up with screen size using responsive prefixes.
- Touch targets (buttons, links) must be minimum `44px × 44px` on mobile.
- Never use fixed pixel widths for layout containers — use `max-w-*` with `mx-auto`.
- Images use `w-full` and `object-cover` by default for fluid scaling.

---

## 6. Design Philosophy & Aesthetic Direction

### Thought Process Before Coding
Before writing a single line of code, answer these questions internally:
- **Purpose**: What problem does this interface solve? Who is the user?
- **Tone**: Commit to a bold aesthetic direction (e.g., luxury/refined, editorial/magazine, brutalist/raw, organic/natural, retro-futuristic). Pick one and execute with precision.
- **Differentiation**: What is the one thing a visitor will remember about this design?

### Anti-Generic Guardrails
- **Colors**: Never use default Tailwind palette (e.g., `indigo-500`, `blue-600`). Define custom brand tokens in `tailwind.config.js`.
- **Typography**: Never use the same font for headings and body. Pair a display/serif with a clean sans-serif. Apply tight tracking (`-0.03em`) on large headings; generous line-height (`1.7`) on body text.
- **Shadows**: Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Gradients**: Layer multiple radial gradients. Add grain/texture via SVG noise filters for depth.
- **Animations**: Only animate `transform` and `opacity`. Never use `transition-all`. Use spring-style easing.
- **Interactive States**: Every clickable element must have `hover`, `focus-visible`, and `active` states — no exceptions.
- **Images**: Add gradient overlay (`bg-gradient-to-t from-black/60`) and color treatment layer using `mix-blend-multiply`.
- **Spacing**: Use intentional, consistent spacing tokens defined in `tailwind.config.js` — not random Tailwind steps.
- **Depth & Layering**: Design a clear z-plane system: `base → elevated → floating`. Never flat layouts.
- **Backgrounds**: Avoid solid colors. Use gradient meshes, noise textures, or geometric patterns for atmosphere.

---

## 7. Brand Assets

- Always check the `brand_assets/` folder before designing.
- If a **logo** is present → import and use it as a React component or `<img>`. Never substitute a placeholder.
- If a **color palette** is defined → add those exact hex values to `tailwind.config.js` under `theme.extend.colors`.
- If a **style guide** or **typography guide** is present → follow it strictly.
- If a **font** is specified → import it via Google Fonts in `index.html` or via `@font-face` in `globals.css`.
- Only use placeholder images (`https://placehold.co/WIDTHxHEIGHT`) where no real asset exists.

---

## 8. Reference Image Workflow

### When a Reference Image Is Provided
- Match layout, spacing, typography, and color **exactly**.
- Translate the design into React components — do not build as static HTML.
- Use placeholder content where real content is unavailable.
- **Do not improve or add to the design** — match it faithfully.
- After each build, screenshot and compare. Fix all visible mismatches. Repeat until no differences remain or the user approves.

### When No Reference Image Is Provided
- Design from scratch with high craft, following all Anti-Generic Guardrails above.
- Present a clear aesthetic rationale before or alongside your first build.

---

## 9. Local Development Server

- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `npm run dev` (Vite serves at `http://localhost:5173`)
- Hot Module Replacement (HMR) is active — changes reflect instantly without full reload.
- If the server is already running, do not start a second instance — check first.
- If the server fails to start, report the full error immediately. Do not proceed.
- Common issues:
  - Port conflict → Vite will auto-increment to `5174`, `5175`, etc. — note the actual port.
  - Missing dependencies → run `npm install` first.
  - Tailwind not working → confirm `postcss.config.js` and `tailwind.config.js` exist.

---

## 10. Screenshot & Comparison Workflow

### Setup
- Puppeteer is installed at: `C:/Users/SP/AppData/Local/Temp/puppeteer-test/`
- Chrome cache is at: `C:/Users/SP/.cache/puppeteer/`

### Taking Screenshots
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:5173`
- Screenshots are auto-saved to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label: `node screenshot.mjs http://localhost:5173 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- **Screenshot at multiple widths** for responsive verification:
  - `node screenshot.mjs http://localhost:5173 mobile` → set viewport to 375px wide
  - `node screenshot.mjs http://localhost:5173 tablet` → set viewport to 768px wide
  - `node screenshot.mjs http://localhost:5173 desktop` → set viewport to 1280px wide

### Comparison Protocol
After each screenshot, read the PNG from `temporary screenshots/` and analyze it directly.
Be specific in comparisons — for example:
- "Heading is `32px` but reference shows `~24px`"
- "Card gap is `16px` but should be `24px`"
- "Nav collapses correctly on mobile but hamburger icon is missing"
- "Primary button color is `#3B82F6` but brand requires `#E63946`"

**Check all of the following on every pass:**
- Spacing & padding
- Font size, weight, and line-height
- Colors (exact hex values from brand tokens)
- Alignment & layout structure
- Border-radius & shadows
- Image sizing & overlays
- Responsive behavior at mobile (375px), tablet (768px), desktop (1280px)
- Navigation state (desktop nav vs mobile hamburger)
- React Router links working correctly (no full page reloads on navigation)

**Minimum 2 comparison rounds** before declaring the build complete. Stop only when no visible differences remain, or the user explicitly approves.

---

## 11. Output Defaults

- **Component files**: `.jsx` extension, one component per file, in the correct `src/` subfolder.
- **Styling**: Tailwind utility classes via `className` in JSX — no inline `style={{}}` unless dynamic values are required.
- **Placeholder Images**: `https://placehold.co/WIDTHxHEIGHT`
- **Responsive**: Mobile-first. Test at `375px`, `768px`, `1024px`, `1280px`.
- **Routing**: All pages registered in `App.jsx`. Use `<Link>` for all internal navigation.
- **Fonts**: Load via Google Fonts `<link>` in `index.html`. Define in `tailwind.config.js`.
- **Icons**: Use `lucide-react` — install with `npm install lucide-react`.
- **Accessibility**: All images have `alt` text. Interactive elements are keyboard-navigable.
- **Performance**: Lazy load all page components with `React.lazy()` + `<Suspense>`.
- **Browser Compatibility**: Target the latest two versions of Chrome, Firefox, Safari, and Edge.

---

## 12. Accessibility Standards

- Use semantic HTML elements inside JSX (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`).
- Ensure color contrast ratios meet WCAG 2.1 AA (minimum `4.5:1` for body text, `3:1` for large text).
- All form inputs must have associated `<label>` elements — use `htmlFor` in JSX (not `for`).
- Focus indicators must be clearly visible — never use `outline-none` without a custom `focus-visible:ring` replacement.
- Use `aria-label` on icon-only buttons (e.g., hamburger menu, close button).
- Use `aria-current="page"` on active `<NavLink>` items.
- Avoid using color alone to convey meaning — always pair with text or icons.
- Modals and drawers must trap focus and close on `Escape` key.

---

## 13. Code Quality Standards

- Write clean, readable, well-commented JSX.
- Use `const` for all component definitions and helper functions.
- Use **named exports** for components and **default export** at the bottom of each file.
- Use the `cn()` utility (clsx + tailwind-merge) for conditional className logic — never string concatenation.
- Extract magic numbers into named constants at the top of the file.
- Remove all `console.log` statements and debug artifacts before finalizing.
- No unused imports — clean up after every edit.
- Keep JSX readable — if a JSX tree exceeds ~20 lines, extract into a sub-component.
- Use optional chaining (`?.`) and nullish coalescing (`??`) to handle undefined data safely.

---

## 14. Performance Standards

- Lazy load all page-level components:
  ```jsx
  const Home = React.lazy(() => import('./pages/Home'));
  ```
- Wrap lazy routes in `<Suspense fallback={<LoadingSpinner />}>`.
- Use `useMemo()` for expensive calculations, `useCallback()` for stable function references passed as props.
- Never import entire libraries when only one function is needed — use named imports.
- Optimize images: use correct dimensions, add `loading="lazy"` to below-fold images.
- Avoid unnecessary re-renders: lift state only as high as necessary.

---

## 15. Hard Rules (Non-Negotiable)

| Rule | Detail |
|------|--------|
| ❌ No static HTML output | Every deliverable is a React component or page |
| ❌ No class components | Functional components with hooks only |
| ❌ No Tailwind CDN | Tailwind installed via npm only |
| ❌ No `<a href>` for internal links | Use `<Link>` or `<NavLink>` from React Router |
| ❌ No added content | Do not add sections or features not in the reference |
| ❌ No unsolicited improvements | Match reference designs exactly |
| ❌ No single-pass screenshots | Always do at least 2 comparison rounds |
| ❌ No `transition-all` | Animate only `transform` and `opacity` |
| ❌ No default Tailwind blue/indigo | Use custom brand-derived color tokens only |
| ❌ No `file:///` screenshots | Always screenshot from `http://localhost:5173` |
| ❌ No inline `style={{}}` | Use Tailwind classes unless dynamic values are needed |
| ✅ Always load skill first | `frontend-design` skill before any code |
| ✅ Always check brand assets | Before designing anything |
| ✅ Always confirm server is running | Before taking any screenshot |
| ✅ Always screenshot at 3 viewports | Mobile (375px), Tablet (768px), Desktop (1280px) |

---

## 16. Session Checklist

Before delivering any output, confirm every item:

**Setup**
- [ ] `frontend-design` skill was loaded
- [ ] `brand_assets/` folder was checked
- [ ] Correct stack confirmed: React 18 + Vite + Tailwind v3 + React Router v6

**Development**
- [ ] All components are functional components with hooks
- [ ] All internal links use `<Link>` or `<NavLink>` from React Router
- [ ] All routes registered in `App.jsx`
- [ ] Lazy loading applied to all page components
- [ ] `cn()` utility used for conditional classes

**Responsive**
- [ ] Mobile layout verified (375px)
- [ ] Tablet layout verified (768px)
- [ ] Desktop layout verified (1280px)
- [ ] Navigation hamburger menu works on mobile

**Quality**
- [ ] No `console.log` or debug artifacts
- [ ] No unused imports
- [ ] All images have `alt` text
- [ ] All interactive elements have hover, focus-visible, and active states
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] At least 2 screenshot comparison rounds completed
- [ ] All hard rules satisfied

---

*Last updated: 2026 — Stack: React 18 · Vite · Tailwind CSS v3 · React Router v6*
*Maintained for use with Claude (Anthropic)*