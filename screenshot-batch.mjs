/**
 * screenshot-batch.mjs — Take full-page screenshots of all pages in dark+light mode.
 * Accepts --round N to prefix the filename with the round number.
 *
 * Usage:
 *   node screenshot-batch.mjs
 *   node screenshot-batch.mjs --round 3
 */

import puppeteer from 'puppeteer'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const BASE = 'http://localhost:5173'
const DIR  = './temporary screenshots'

const args  = process.argv.slice(2)
const roundIdx = args.indexOf('--round')
const round = roundIdx !== -1 ? args[roundIdx + 1] : '2'

if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })

const PAGES = [
  { path: '/',                name: 'home' },
  { path: '/about',           name: 'about' },
  { path: '/experience',      name: 'experience' },
  { path: '/skills',          name: 'skills' },
  { path: '/certifications',  name: 'certifications' },
  { path: '/contact',         name: 'contact' },
]

const VIEWPORTS = [
  { label: 'desktop', width: 1280, height: 900 },
  { label: 'tablet',  width: 768,  height: 1024 },
  { label: 'mobile',  width: 375,  height: 812 },
]

const THEMES = ['dark', 'light']

async function screenshot(page, filepath, viewport) {
  // Scroll to trigger IntersectionObservers
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight
    const step = window.innerHeight
    for (let y = 0; y <= totalHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise(r => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await new Promise(r => setTimeout(r, 1000))
  await page.screenshot({ path: filepath, fullPage: true })
  console.log(`  ✓ ${filepath}`)
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const theme of THEMES) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height })

    // Set theme in localStorage before any script runs
    await page.evaluateOnNewDocument((t) => {
      localStorage.setItem('shailesh-portfolio-theme', t)
    }, theme)

    for (const pg of PAGES) {
      const url = BASE + pg.path
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 })
      await new Promise(r => setTimeout(r, 800))

      const filepath = join(DIR, `r${round}-${theme}-${pg.name}-${vp.label}.png`)
      await screenshot(page, filepath, vp)
    }

    await page.close()
  }
}

await browser.close()
console.log('\nBatch screenshot complete.')
