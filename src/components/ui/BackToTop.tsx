import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { scrollToTop } from '../../lib/scroll'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduced ? undefined : { y: -3, scale: 1.05 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
          aria-label="Scroll back to top"
          className="group fixed right-5 sm:right-6 z-40 bottom-[100px] sm:bottom-[112px] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream/95 backdrop-blur-md border border-brown-dark/10 text-brown-dark shadow-large flex items-center justify-center hover:bg-brown-dark hover:text-cream hover:border-brown-dark transition-all duration-400 ease-expo-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan/60"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-400 ease-expo-out group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
