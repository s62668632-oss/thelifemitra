import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import './index.css'

// ponytail: skip analytics in iframes (Vercel dashboard preview etc.) —
// the insights script touches localStorage/cookies and throws SecurityError
// in a cross-origin iframe, which React surfaces to the nearest ErrorBoundary
// and replaces the whole page with the "Something went wrong" fallback.
const inIframe =
  typeof window !== 'undefined' &&
  typeof window.self !== 'undefined' &&
  typeof window.top !== 'undefined' &&
  window.self !== window.top

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {!inIframe && <Analytics />}
  </React.StrictMode>,
)
