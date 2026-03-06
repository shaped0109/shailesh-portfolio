/**
 * screenshot.mjs — Take full-page screenshots at various viewport widths.
 * Scrolls the page first to trigger all IntersectionObservers.
 *
 * Usage:
 *   node screenshot.mjs <url> [label]
 *   node screenshot.mjs http://localhost:5173 desktop
 *   node screenshot.mjs http://localhost:5173 mobile
 *   node screenshot.mjs http://localhost:5173 tablet
 */

import puppeteer from 'puppeteer'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import { join } from 'path'

const VIEWPORT_MAP = {
  mobile:  { width: 375,  height: 812 },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1280, height: 900 },
  large:   { width: 1536, height: 900 },
}

const url   = process.argv[2] ?? 'http://localhost:5173'
const label = process.argv[3] ?? 'desktop'
const viewport = VIEWPORT_MAP[label] ?? VIEWPORT_MAP.desktop

const dir = './temporary screenshots'
if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

const existing = existsSync(dir) ? readdirSync(dir) : []
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0')).filter(Boolean)
const next = nums.length ? Math.max(...nums) + 1 : 1
const filename = join(dir, `screenshot-${next}-${label}.png`)

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport(viewport)
await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 })

// Wait for initial React render + animations
await new Promise(r => setTimeout(r, 800))

// Scroll through page to trigger IntersectionObservers for all sections
await page.evaluate(async () => {
  const totalHeight = document.body.scrollHeight
  const step = window.innerHeight
  for (let y = 0; y <= totalHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise(r => setTimeout(r, 120))
  }
  window.scrollTo(0, 0)
})

// Wait for all triggered animations/transitions to complete
await new Promise(r => setTimeout(r, 1200))

await page.screenshot({ path: filename, fullPage: true })
await browser.close()

console.log(`Screenshot saved: ${filename} (${viewport.width}x${viewport.height})`)
