// Builds the pitch deck PDF from the running dev server (npm run dev).
//   node scripts/deck.mjs shots   -> real screenshots of the site into public/deck-shots/
//   node scripts/deck.mjs pdf     -> renders /deck.html to ../GGX_Pitch_Deck.pdf
// ponytail: uses the locally installed Chrome via puppeteer-core, no browser download.
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const BASE = process.env.GGX_URL ?? 'http://localhost:5173'
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const root = fileURLToPath(new URL('..', import.meta.url))
const mode = process.argv[2] ?? 'pdf'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Demo state so order and pass screens have something real to show
const state = {
  cart: [], wishlist: ['navaja-knife-safari-mesh'], credits: 5, listings: [], invited: [],
  orders: [{ id: 'GGX-4821', line: { key: 'k1', itemId: 'ps5-slim', mode: 'rent', days: 3, start: '2026-10-17' }, amount: 1050, deposit: 10000, credits: 10, stage: 1, created: 1791480000065, track: 'rent' }],
  passes: [{ id: 'PASS-731904', tournamentId: 'fury-bgmi', team: 'Girnar Ghosts', created: 1791480000000 }],
}

const SHOTS = [
  { name: 'home', path: '/', w: 1440, h: 900 },
  { name: 'market', path: '/market?kind=cs2&sort=low', w: 1440, h: 900 },
  { name: 'item', path: '/item/navaja-knife-safari-mesh', w: 1440, h: 900 },
  { name: 'skinlab', path: '/skin-lab', w: 1440, h: 900 },
  { name: 'm-market', path: '/market?kind=cs2&sort=low', w: 390, h: 844, mobile: true },
  { name: 'm-order', path: '/order/GGX-4821', w: 390, h: 844, mobile: true },
  { name: 'm-pass', path: '/arena/fury-bgmi', w: 390, h: 844, mobile: true, scroll: 1150 },
  { name: 'm-item', path: '/item/ps5-slim', w: 390, h: 844, mobile: true, scroll: 520 },
]

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] })
try {
  const page = await browser.newPage()
  if (mode === 'shots') {
    mkdirSync(root + 'public/deck-shots', { recursive: true })
    await page.goto(BASE, { waitUntil: 'networkidle0' })
    await page.evaluate((s) => localStorage.setItem('ggx-demo-v1', JSON.stringify(s)), state)
    for (const s of SHOTS) {
      await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2, isMobile: !!s.mobile, hasTouch: !!s.mobile })
      await page.goto(BASE + s.path, { waitUntil: 'networkidle0', timeout: 60000 })
      if (s.scroll) await page.evaluate((y) => window.scrollTo(0, y), s.scroll)
      await sleep(2500) // entrance animations + lazy images
      await page.screenshot({ path: `${root}public/deck-shots/${s.name}.png` })
      console.log('shot', s.name)
    }
  } else {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(BASE + '/deck.html', { waitUntil: 'networkidle0', timeout: 90000 })
    await page.evaluate(() => document.fonts.ready)
    await sleep(1500)
    await page.pdf({ path: root + '../GGX_Pitch_Deck.pdf', width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
    console.log('pdf written: GGX_Pitch_Deck.pdf')
  }
} finally {
  await browser.close()
}
