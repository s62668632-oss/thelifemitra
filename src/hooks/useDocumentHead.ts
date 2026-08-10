import { useEffect } from 'react'

interface HeadOptions {
  title: string
  description: string
  canonical: string
  ogImage?: string
  jsonLd?: object
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useDocumentHead({ title, description, canonical, ogImage, jsonLd }: HeadOptions) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    if (ogImage) setMeta('property', 'og:image', ogImage)

    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    const previousCanonical = canonicalEl.getAttribute('href') || ''
    canonicalEl.setAttribute('href', canonical)

    let scriptEl: HTMLScriptElement | null = null
    if (jsonLd) {
      scriptEl = document.createElement('script')
      scriptEl.type = 'application/ld+json'
      scriptEl.setAttribute('data-route-schema', 'true')
      scriptEl.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(scriptEl)
    }

    return () => {
      document.title = previousTitle
      canonicalEl!.setAttribute('href', previousCanonical)
      if (scriptEl) scriptEl.remove()
    }
  }, [title, description, canonical, ogImage, jsonLd])
}
