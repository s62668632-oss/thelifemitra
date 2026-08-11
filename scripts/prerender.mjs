// Post-build prerender step.
//
// The app is a client-rendered React SPA (Vite + React Router) — the raw
// HTML Vite outputs has an empty <body>, so crawlers that don't execute JS
// (most AI answer engines: GPTBot, ClaudeBot, PerplexityBot) see nothing.
// This script boots a headless Chromium against the just-built dist/,
// visits every route, waits for the page to settle, and writes the fully
// rendered HTML back into dist/ so static hosting serves real content.
//
// Designed to be a "best effort" step: if anything here fails (Chromium
// unavailable, timeout, etc.) it logs a warning and exits 0 so the rest of
// the Vercel build/deploy is never blocked by this.

import { chromium } from 'playwright'
import sparticuzChromium from '@sparticuz/chromium'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, '..', 'dist')

// Keep in sync with src/data/services.ts slugs.
const SERVICE_SLUGS = [
  'career-guidance',
  'public-speaking-coaching',
  'time-management-coaching',
  'stress-management-coaching',
  'relationship-coaching',
  'emotional-healing-coaching',
  'executive-communication-coaching',
  'law-of-attraction-coaching',
  'business-startup-coaching',
  'sales-management-workshop',
]

const ROUTES = ['/', ...SERVICE_SLUGS.map((slug) => `/services/${slug}`)]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

// Vercel's build machine lacks the system NSS/NSPR libraries Playwright's
// own downloaded Chromium needs (it isn't a fully-supported Playwright OS),
// so on Vercel we launch the statically-bundled binary from
// @sparticuz/chromium instead, which ships its own shared libraries.
async function launchBrowser() {
  if (process.env.VERCEL) {
    return chromium.launch({
      executablePath: await sparticuzChromium.executablePath(),
      args: sparticuzChromium.args,
      headless: true,
    })
  }
  return chromium.launch()
}

async function fileExists(p) {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

function startStaticServer(rootDir) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0])
      let filePath = path.join(rootDir, urlPath)

      if (!(await fileExists(filePath)) || (await stat(filePath)).isDirectory()) {
        filePath = path.join(rootDir, 'index.html')
      }

      try {
        const data = await readFile(filePath)
        const ext = path.extname(filePath)
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        res.end(data)
      } catch {
        res.writeHead(404)
        res.end('Not found')
      }
    })
    server.listen(0, '127.0.0.1', () => resolve(server))
  })
}

async function outputPathForRoute(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html')
  const routeDir = path.join(DIST_DIR, route.replace(/^\//, ''))
  await mkdir(routeDir, { recursive: true })
  return path.join(routeDir, 'index.html')
}

async function run() {
  const indexExists = await fileExists(path.join(DIST_DIR, 'index.html'))
  if (!indexExists) {
    console.warn('[prerender] dist/index.html not found — skipping prerender (did the build run?).')
    return
  }

  const server = await startStaticServer(DIST_DIR)
  const { port } = server.address()
  const baseUrl = `http://127.0.0.1:${port}`

  const browser = await launchBrowser()
  const context = await browser.newContext()
  await context.route('**/*', (route) => {
    // Block outbound network calls (fonts, analytics, EmailJS) during
    // prerender — we only need the DOM to settle, not real network I/O.
    const url = route.request().url()
    if (url.startsWith(baseUrl)) {
      route.continue()
    } else {
      route.abort()
    }
  })

  let successCount = 0

  for (const routePath of ROUTES) {
    const page = await context.newPage()
    try {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(`${baseUrl}${routePath}`, { waitUntil: 'networkidle', timeout: 15000 })
      await page.waitForTimeout(300)

      const html = await page.content()
      if (!html.includes('<h1') && routePath !== '/') {
        console.warn(`[prerender] ${routePath}: no <h1> found after render, skipping write for safety.`)
        continue
      }

      const outPath = await outputPathForRoute(routePath)
      await writeFile(outPath, html, 'utf8')
      successCount++
      console.log(`[prerender] wrote ${path.relative(DIST_DIR, outPath)}`)
    } catch (err) {
      console.warn(`[prerender] ${routePath} failed, leaving original build output in place:`, err.message)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()

  console.log(`[prerender] done: ${successCount}/${ROUTES.length} routes prerendered.`)
}

try {
  await run()
} catch (err) {
  console.warn('[prerender] step failed entirely, continuing with un-prerendered build output:', err?.message || err)
}
// Always succeed — this step must never fail the deploy.
process.exit(0)
