import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/sections/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import ErrorBoundary from './components/ui/ErrorBoundary'
import WhatsAppButton from './components/ui/WhatsAppButton'
import BackToTop from './components/ui/BackToTop'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import { scrollToHashWhenReady, scrollToTop } from './lib/scroll'

function RouteChangeHandler() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      scrollToHashWhenReady(location.hash.slice(1))
    } else {
      scrollToTop()
    }
  }, [location.pathname, location.hash])

  return null
}

function App() {
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
        <RouteChangeHandler />

        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </div>
    </ErrorBoundary>
  )
}

export default App
