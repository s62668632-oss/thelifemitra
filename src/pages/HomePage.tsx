import { Suspense, lazy } from 'react'
import Hero from '../components/sections/Hero'
import { useDocumentHead } from '../hooks/useDocumentHead'

const About = lazy(() => import('../components/sections/About'))
const Services = lazy(() => import('../components/sections/Services'))
const BuildLife = lazy(() => import('../components/sections/BuildLife'))
const FAQ = lazy(() => import('../components/sections/FAQ'))
const Contact = lazy(() => import('../components/sections/Contact'))

const HOME_TITLE = 'The Life Mitra — Real Conversations. Real Growth.'
const HOME_DESCRIPTION = 'The Life Mitra — life coaching by Sachin Chindarkar. Helping you overcome confusion, self-doubt, and lack of purpose with real conversations, real growth, and real transformation.'

export default function HomePage() {
  useDocumentHead({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: 'https://www.thelifemitra.com/',
    ogImage: 'https://www.thelifemitra.com/og-image.png',
  })

  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-screen" />}>
        <About />
        <Services />
        <BuildLife />
        <FAQ />
        <Contact />
      </Suspense>
    </>
  )
}
