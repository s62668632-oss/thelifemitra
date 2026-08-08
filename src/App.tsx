import { useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import Footer from './components/sections/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import ErrorBoundary from './components/ui/ErrorBoundary'
import WhatsAppButton from './components/ui/WhatsAppButton'
import BackToTop from './components/ui/BackToTop'

const About = lazy(() => import('./components/sections/About'))
const Services = lazy(() => import('./components/sections/Services'))
const BuildLife = lazy(() => import('./components/sections/BuildLife'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const Contact = lazy(() => import('./components/sections/Contact'))

function App() {
  useEffect(() => {
    document.title = 'Life Mitra — Real Conversations. Real Growth.'
  }, [])

  return (
    <ErrorBoundary>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[10000] focus:px-4 focus:py-2.5 focus:bg-brown-dark focus:text-cream focus:rounded-lg focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-tan/60 focus:shadow-lg"
      >
        Skip to content
      </a>
      <div className="relative">
        <div className="grain-overlay" />

        <ScrollProgress />
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Suspense fallback={<div className="h-screen" />}>
            <About />
            <Services />
            <BuildLife />
            <FAQ />
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </div>
    </ErrorBoundary>
  )
}

export default App
