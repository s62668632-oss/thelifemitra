// On Vercel, prerender.mjs uses @sparticuz/chromium (a serverless-packaged
// binary) instead of Playwright's own downloaded Chromium, since Vercel's
// build machine is missing the system libraries that binary needs. So skip
// the download there; keep it for local dev where Playwright's Chromium
// works fine.
import { execSync } from 'node:child_process'

if (process.env.VERCEL) {
  console.log('[postinstall] Skipping Playwright browser download on Vercel — prerender uses @sparticuz/chromium instead.')
} else {
  try {
    execSync('playwright install chromium', { stdio: 'inherit' })
  } catch (err) {
    console.warn('[postinstall] Playwright browser install failed (non-fatal):', err.message)
  }
}
