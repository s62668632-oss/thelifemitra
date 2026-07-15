import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-tan origin-left z-[1001]"
      style={{
        scaleX,
        boxShadow: '0 0 5px 1px rgba(184, 151, 106, 0.3)',
      }}
    />
  )
}
