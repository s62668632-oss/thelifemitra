export function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Waits for a lazy-loaded section (e.g. Contact, loaded via Suspense) to
 * mount before scrolling to it — needed when navigating cross-page to a
 * hash target rather than clicking an in-page anchor.
 */
export function scrollToHashWhenReady(id: string, timeoutMs = 2000) {
  const start = performance.now()
  const attempt = () => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }
    if (performance.now() - start < timeoutMs) {
      requestAnimationFrame(attempt)
    }
  }
  attempt()
}
