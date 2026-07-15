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
