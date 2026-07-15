import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '../lib/scroll'

const sectionIds = ['home', 'about', 'services', 'contact']

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const lastScrollY = useRef(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    setScrolled(currentY > 40)
    if (currentY > lastScrollY.current && currentY > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    lastScrollY.current = currentY
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      firstLinkRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      // Only refocus hamburger if we just closed it intentionally
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Auto-close mobile menu when viewport grows past lg
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          // Pick the section closest to the middle of the viewport (more
          // intuitive than the highest intersection ratio, which biases
          // toward tall sections like `contact`).
          const viewportMid = window.innerHeight / 2
          let best = visible[0]
          let bestDist = Infinity
          for (const entry of visible) {
            const rect = entry.target.getBoundingClientRect()
            const sectionMid = rect.top + rect.height / 2
            const dist = Math.abs(sectionMid - viewportMid)
            if (dist < bestDist) { bestDist = dist; best = entry }
          }
          setActiveSection(best.target.id)
        }
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: [0, 0.2, 0.5, 0.8] }
    )

    elements.forEach(el => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    scrollToSection(href)
  }, [])

  const handleMobileKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMobileOpen(false)
      hamburgerRef.current?.focus()
    }
    if (e.key === 'Tab' && mobileMenuRef.current) {
      const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>('a, button')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-expo-out ${
          hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
        initial={{ y: -100 }}
        animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main navigation"
      >
        <div className={`mx-auto transition-all duration-500 ease-expo-out ${
          scrolled
            ? 'max-w-[calc(100%-16px)] sm:max-w-[460px] md:max-w-[480px] mt-2.5 sm:mt-3 mx-auto rounded-full glass border border-brown-dark/8 shadow-nav px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5'
            : 'max-w-[1280px] px-3.5 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-3 sm:py-3.5 md:py-4 lg:py-5'
        }`}>
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan/60 rounded-full p-1"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="Life Mitra — back to top"
            >
              <img
                src="/logo.png"
                alt="Life Mitra"
                width={120}
                height={56}
                className="h-10 sm:h-11 md:h-12 w-auto"
              />
            </a>

            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative inline-flex items-center gap-2 px-3.5 py-2.5 text-[0.8rem] font-medium rounded-full transition-all duration-300 ease-expo-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan/60 ${
                        isActive
                          ? 'text-cream bg-brown-dark shadow-soft'
                          : 'text-text-secondary/80 hover:text-brown-dark hover:bg-brown-dark/[0.04]'
                      }`}
                    >
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-tan animate-pulse-glow"
                          aria-hidden="true"
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                )
              })}
              <li className="ml-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brown-dark text-cream text-[0.7rem] font-medium tracking-[0.06em] uppercase rounded-full border border-brown-dark overflow-hidden transition-all duration-400 ease-expo-out hover:bg-transparent hover:text-brown-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan/60"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-tan/15 to-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">Book Now</span>
                </a>
              </li>
            </ul>

            <button
              ref={hamburgerRef}
              className="lg:hidden relative z-[1002] w-11 h-11 flex items-center justify-center rounded-full hover:bg-brown-dark/5 active:bg-brown-dark/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan/60"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-overlay"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-brown-dark" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-brown-dark" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-overlay"
            className="fixed inset-0 z-[999] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            ref={mobileMenuRef}
            onKeyDown={handleMobileKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-beige/50 backdrop-blur-xl" />

            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #2E1F16 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="flex flex-col items-center justify-center h-full px-6 relative z-10">
              <nav aria-label="Mobile" className="flex flex-col items-center gap-1 sm:gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    ref={i === 0 ? firstLinkRef : undefined}
                    aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                    className={`font-display text-3xl sm:text-4xl px-6 py-3 rounded-2xl transition-all duration-300 ease-expo-out min-w-[200px] text-center ${
                      activeSection === link.href.slice(1)
                        ? 'text-cream bg-brown-dark'
                        : 'text-brown-dark/80 hover:bg-brown-dark/5'
                    }`}
                    initial={{ opacity: 0, y: 25, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="mt-7 sm:mt-8 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: 0.25, duration: 0.45 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-primary text-sm px-7 py-4"
                >
                  Book Consultation
                </a>
                <div className="text-center text-[0.7rem] text-text-secondary/60 space-y-1">
                  <a
                    href="tel:+918097945878"
                    className="block hover:text-brown-dark transition-colors duration-300 py-1"
                  >
                    +91 8097945878
                  </a>
                  <a
                    href="mailto:info.Thelifemitra@gmail.com"
                    className="block hover:text-brown-dark transition-colors duration-300 py-1 break-all"
                  >
                    info.Thelifemitra@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
