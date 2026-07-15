import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { ArrowRight, Sparkles, Quote } from 'lucide-react'
import { useRef, useEffect, useState, ElementType } from 'react'
import { scrollToSection } from '../../lib/scroll'

const STATS = [
  { value: '12+', label: 'Years Coaching' },
  { value: '500+', label: 'Clients Guided' },
  { value: '1:1', label: 'Personal Sessions' },
]

const PROOF_POINTS: { icon: ElementType; label: string }[] = [
  { icon: Quote, label: 'Real conversations. No scripts.' },
  { icon: Sparkles, label: 'Practical tools that stick.' },
]

function CrestAside() {
  const reducedMotion = useRef(false)
  const asideRef = useRef<HTMLDivElement>(null)
  const [reducedMotionState, setReducedMotionState] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotionState(mq.matches)
    reducedMotion.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotionState(e.matches)
      reducedMotion.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Cursor-driven tilt + parallax for the crest
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const tiltX = useSpring(useMotionTemplate`${useTransform(mouseY, [-1, 1], [6, -6])}deg`, { stiffness: 120, damping: 18, mass: 0.6 })
  const tiltY = useSpring(useMotionTemplate`${useTransform(mouseX, [-1, 1], [-8, 8])}deg`, { stiffness: 120, damping: 18, mass: 0.6 })
  const pillParallaxX = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), { stiffness: 80, damping: 18, mass: 0.6 })
  const pillParallaxY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), { stiffness: 80, damping: 18, mass: 0.6 })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion.current) return
    const rect = asideRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    mouseX.set(cx * 2 - 1)
    mouseY.set(cy * 2 - 1)
  }
  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Drive the SVG sweep angle continuously (one revolution every 12s)
  const [sweepAngle, setSweepAngle] = useState(0)
  useEffect(() => {
    if (reducedMotion.current) return
    let frame = 0
    let last = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = now - last
      last = now
      // 30 degrees / second -> 360 deg in 12s
      frame += dt * 0.03
      setSweepAngle(frame % 360)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.aside
      ref={asideRef}
      className="relative hidden md:flex items-center justify-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotionState ? 0.4 : 1.1, delay: reducedMotionState ? 0.2 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[460px] aspect-square" style={{ perspective: '1200px' }}>
        {/* Tilt wrapper */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', rotateX: reducedMotionState ? 0 : tiltX, rotateY: reducedMotionState ? 0 : tiltY }}
        >
          <CrestMark sweepAngle={reducedMotionState ? 0 : sweepAngle} />
        </motion.div>

        {/* Center monogram seal — single premium mark, no crowding */}
        <motion.div
          className="absolute inset-[24%] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotionState ? 0.3 : 0.9, delay: reducedMotionState ? 0.5 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex flex-col items-center text-center">
            {/* Monogram — single display initial with quiet subtitle */}
            <motion.div
              className="font-display italic text-[clamp(2.4rem,4.2vw,3.4rem)] leading-none text-brown-dark"
              animate={{
                filter: 'drop-shadow(0 4px 14px rgba(184,151,106,0.32))',
              }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            >
              S<span className="text-tan">·</span>C
            </motion.div>
            {/* Thin gold rule that draws itself under the monogram */}
            <svg
              aria-hidden="true"
              className="mt-3 overflow-visible"
              width="90"
              height="6"
              viewBox="0 0 90 6"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0" y1="3" x2="90" y2="3"
                stroke="url(#sigGrad)"
                strokeWidth="1"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ pathLength: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 1 } }}
              />
              <motion.circle
                r="1.4"
                fill="#B8976A"
                initial={false}
                animate={{ cx: [0, 90], cy: 3, opacity: [1, 1, 0] }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], times: [0, 0.95, 1], repeat: Infinity, repeatDelay: 1.6 }}
                style={{ filter: 'drop-shadow(0 0 4px rgba(184,151,106,0.9))' }}
              />
            </svg>
            {/* Sub-label */}
            <div className="mt-2 text-[0.55rem] sm:text-[0.6rem] tracking-[0.32em] uppercase font-body text-brown-dark/60 font-medium">
              Life&nbsp;·&nbsp;mitra
            </div>
          </div>
        </motion.div>

        {/* Top right pill - floating with parallax */}
        <motion.div
          className="absolute -top-3 -right-3 px-3.5 py-2 rounded-full bg-brown-dark text-cream shadow-large flex items-center gap-2"
          initial={reducedMotionState ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{
            opacity: 1,
            y: reducedMotionState ? 0 : [0, -4, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: reducedMotionState ? 0.55 : 1.15, ease: [0.16, 1, 0.3, 1] },
            y: reducedMotionState ? { duration: 0.6, delay: 1.15 } : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.15 },
          }}
          style={{ x: reducedMotionState ? 0 : pillParallaxX, y: reducedMotionState ? 0 : pillParallaxY }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-tan animate-pulse" />
          <span className="text-[0.6rem] tracking-[0.18em] uppercase font-medium">
            Accepting Clients
          </span>
        </motion.div>

        {/* Bottom left pill - floating with parallax (offset phase) */}
        <motion.div
          className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-full bg-warm-white shadow-large border border-brown-dark/10 flex items-center gap-2"
          initial={reducedMotionState ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: reducedMotionState ? 0 : [0, 4, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: reducedMotionState ? 0.6 : 1.3, ease: [0.16, 1, 0.3, 1] },
            y: reducedMotionState ? { duration: 0.6, delay: 1.3 } : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.2 },
          }}
          style={{ x: reducedMotionState ? 0 : useTransform(pillParallaxX, (v) => -v), y: reducedMotionState ? 0 : pillParallaxY }}
        >
          <Quote className="w-3.5 h-3.5 text-tan" strokeWidth={1.5} />
          <span className="text-[0.65rem] tracking-[0.18em] uppercase font-medium text-brown-dark">
            One · Real · Step
          </span>
        </motion.div>
      </div>
    </motion.aside>
  )
}

function CrestMark({ sweepAngle }: { sweepAngle: number }) {
  // Cardinal positions in degrees, matching the labels below
  const RISE = -90   // top
  const CREATE = 180 // left
  const BECOME = 90  // bottom
  const CRAFT = 0    // right
  // Find the angle just past the current sweep (the "trailing" cardinal) to highlight
  const normalizedSweep = ((sweepAngle % 360) + 360) % 360
  const distances: [number, number][] = [
    [RISE, Math.abs(((normalizedSweep - RISE + 540) % 360) - 180)],
    [CREATE, Math.abs(((normalizedSweep - CREATE + 540) % 360) - 180)],
    [BECOME, Math.abs(((normalizedSweep - BECOME + 540) % 360) - 180)],
    [CRAFT, Math.abs(((normalizedSweep - CRAFT + 540) % 360) - 180)],
  ]
  // Pick the cardinal closest to the leading edge of the sweep (after the sweep position)
  const trailing = distances.reduce((a, b) => (a[1] < b[1] ? a : b))[0]

  return (
    <svg
      viewBox="0 0 320 320"
      className="w-full h-full"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="crestGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#F5E0CC" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#EDCBA8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FDF9F3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8976A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A68B5B" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A6350" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2E1F16" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="riseArc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8976A" />
          <stop offset="100%" stopColor="#2E1F16" />
        </linearGradient>
        {/* Sweep trail gradient: bright leading edge, fading tail */}
        <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8976A" stopOpacity="0" />
          <stop offset="78%" stopColor="#B8976A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4955A" stopOpacity="0.95" />
        </linearGradient>
        {/* Soft glow filter for the sweep leading edge */}
        <filter id="sweepGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Word halo — radial glow behind the centred words */}
        <radialGradient id="wordHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EDCBA8" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#F5E0CC" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FDFCF9" stopOpacity="0" />
        </radialGradient>
        {/* Aurora ring gradient — gold sweep */}
        <linearGradient id="auroraGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8976A" stopOpacity="0" />
          <stop offset="50%" stopColor="#D4955A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#B8976A" stopOpacity="0" />
        </linearGradient>
        {/* Signature gradient — fades at both ends */}
        <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8976A" stopOpacity="0" />
          <stop offset="20%" stopColor="#B8976A" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#D4955A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4955A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="160" r="158" fill="url(#crestGlow)" />

      {/* Static rings & labels (do not rotate) */}
      <circle cx="160" cy="160" r="118" fill="none" stroke="rgba(46, 31, 22, 0.18)" strokeWidth="0.6" />
      <circle cx="160" cy="160" r="92" fill="none" stroke="rgba(46, 31, 22, 0.28)" strokeWidth="0.8" />

      {/* Dashed outer ring — gently rotates around the centre on its own */}
      <g style={{ transformOrigin: '50% 50%' }}>
        <circle
          cx="160" cy="160" r="138"
          fill="none"
          stroke="url(#ringStroke)"
          strokeWidth="0.8"
          strokeDasharray="2 4"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 160 160"
            to="360 160 160"
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Sweep arc — rotates around the centre, driven by parent motion */}
      <g style={{ transform: `rotate(${sweepAngle}deg)`, transformOrigin: '50% 50%' }}>
        <path
          d="M 160 22 A 138 138 0 0 1 270 100"
          fill="none"
          stroke="url(#sweepGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#sweepGlow)"
        />
        {/* Leading bright tip */}
        <g transform="translate(270 100)">
          <circle r="4" fill="#D4955A" opacity="0.9" />
          <circle r="8" fill="#D4955A" opacity="0.18" />
        </g>
      </g>

      {/* Inner medallion — calm disc. Engraving layer rotates slowly CCW; centre stays anchored. */}
      <g transform="translate(160 160)">
        {/* Static disc + rising arc + centre halo + jewel (anchored) */}
        <circle r="64" fill="#FDFCF9" />
        <circle r="64" fill="none" stroke="rgba(46, 31, 22, 0.18)" strokeWidth="0.8" />
        <circle r="52" fill="none" stroke="rgba(46, 31, 22, 0.08)" strokeWidth="0.5" />

        {/* Soft glow halo centred on the monogram — pulses gently */}
        <ellipse cx="0" cy="6" rx="42" ry="30" fill="url(#wordHalo)">
          <animate attributeName="opacity" values="0.55;0.9;0.55" dur="4s" repeatCount="indefinite" />
        </ellipse>

        {/* Single jewel dot at the centre anchor — soft pulse */}
        <circle cx="0" cy="-2" r="3.5" fill="url(#ringStroke)">
          <animate attributeName="r" values="3.2;4.4;3.2" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.85;1;0.85" dur="3.6s" repeatCount="indefinite" />
        </circle>

        {/* Rising arc — subtle, sits behind everything */}
        <g stroke="url(#riseArc)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.85">
          <path d="M -48 28 Q 0 -18 48 28" />
          <path d="M -34 18 Q 0 -28 34 18" opacity="0.45" />
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0" to="-360" dur="120s" repeatCount="indefinite" />
        </g>

        {/* Engraving rotation layer — ring + 24 ticks + halo orbit + side dots + measurement ticks */}
        <g style={{ transformOrigin: '0 0' }}>
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0" to="-360" dur="80s" repeatCount="indefinite" />

          {/* Precise engraved ring behind the monogram — gives the mark a true frame */}
          <circle r="48" fill="none" stroke="rgba(184, 151, 106, 0.35)" strokeWidth="0.5" strokeDasharray="1 2" />
          {/* 24 micro ticks on that ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2
            const r1 = 50
            const r2 = i % 2 === 0 ? 53.5 : 52
            const x1 = Math.cos(a) * r1
            const y1 = Math.sin(a) * r1
            const x2 = Math.cos(a) * r2
            const y2 = Math.sin(a) * r2
            return (
              <line
                key={`tick-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(184, 151, 106, 0.55)"
                strokeWidth={i % 6 === 0 ? 0.9 : 0.5}
                strokeLinecap="round"
              />
            )
          })}

          {/* Halo orbit — 12 micro-dots revolve opposite to engraving for parallax depth */}
          <g>
            <g>
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2
                const x = Math.cos(a) * 58
                const y = Math.sin(a) * 44 + 4
                return (
                  <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 0.9 : 0.55} fill="#B8976A" opacity={i % 3 === 0 ? 0.55 : 0.28}>
                    <animate attributeName="opacity" values={`${(i % 3 === 0 ? 0.55 : 0.28)};0.08;${(i % 3 === 0 ? 0.55 : 0.28)}`} dur={`${4 + (i % 4) * 0.6}s`} begin={`${i * 0.18}s`} repeatCount="indefinite" />
                  </circle>
                )
              })}
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360" to="0" dur="48s" repeatCount="indefinite" />
            </g>
          </g>

          {/* Small dot flourishes tucked to the sides — they rotate with the engraving */}
          <g fill="#B8976A" opacity="0.6">
            <circle cx="-26" cy="-2" r="1.6">
              <animate attributeName="opacity" values="0.35;0.85;0.35" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="-32" cy="-2" r="0.9">
              <animate attributeName="opacity" values="0.15;0.55;0.15" dur="3s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle cx="26" cy="10" r="1.6">
              <animate attributeName="opacity" values="0.35;0.85;0.35" dur="3s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <circle cx="32" cy="10" r="0.9">
              <animate attributeName="opacity" values="0.15;0.55;0.15" dur="3s" repeatCount="indefinite" begin="1.6s" />
            </circle>
          </g>

          {/* Top + bottom measurement ticks — like a precision dial */}
          <g stroke="#B8976A" strokeLinecap="round">
            <line x1="-6" y1="-32" x2="-3" y2="-32" strokeWidth="0.8" opacity="0.55" />
            <line x1="0" y1="-32" x2="3" y2="-32" strokeWidth="0.8" opacity="0.55" />
            <line x1="6" y1="-32" x2="9" y2="-32" strokeWidth="0.8" opacity="0.55" />
            <line x1="12" y1="-32" x2="16" y2="-32" strokeWidth="0.9" opacity="0.7" />
            <line x1="-12" y1="-32" x2="-16" y2="-32" strokeWidth="0.9" opacity="0.7" />
            <line x1="-6" y1="36" x2="-3" y2="36" strokeWidth="0.8" opacity="0.55" />
            <line x1="0" y1="36" x2="3" y2="36" strokeWidth="0.8" opacity="0.55" />
            <line x1="6" y1="36" x2="9" y2="36" strokeWidth="0.8" opacity="0.55" />
            <line x1="12" y1="36" x2="16" y2="36" strokeWidth="0.9" opacity="0.7" />
            <line x1="-12" y1="36" x2="-16" y2="36" strokeWidth="0.9" opacity="0.7" />
          </g>
        </g>

        {/* Bottom anchor line — stays put as a frame edge */}
        <line x1="-44" y1="44" x2="44" y2="44" stroke="rgba(46, 31, 22, 0.22)" strokeWidth="0.8" strokeDasharray="1 3" />
      </g>

      {/* Labels — pinned to the four cardinal points; do not move */}
      <g fontFamily="'Playfair Display', Georgia, serif" fill="#2E1F16">
        <text x="160" y="34" textAnchor="middle" fontSize="9" letterSpacing="6" opacity={trailing === RISE ? 0.95 : 0.55} fill={trailing === RISE ? '#B8976A' : '#2E1F16'}>RISE</text>
        <text x="160" y="298" textAnchor="middle" fontSize="9" letterSpacing="6" opacity={trailing === BECOME ? 0.95 : 0.55} fill={trailing === BECOME ? '#B8976A' : '#2E1F16'}>BECOME</text>
        <text x="32" y="166" textAnchor="middle" fontSize="9" letterSpacing="4" opacity={trailing === CREATE ? 0.95 : 0.45} fill={trailing === CREATE ? '#B8976A' : '#2E1F16'} transform="rotate(-90 32 166)">CREATE</text>
        <text x="288" y="166" textAnchor="middle" fontSize="9" letterSpacing="4" opacity={trailing === CRAFT ? 0.95 : 0.45} fill={trailing === CRAFT ? '#B8976A' : '#2E1F16'} transform="rotate(90 288 166)">CRAFT</text>
      </g>

      {/* Cardinal markers — the trailing one glows larger as the sweep passes over it */}
      <g fill="#B8976A">
        <circle cx="160" cy="56" r={trailing === RISE ? 3.2 : 2}>
          {trailing === RISE && (
            <animate attributeName="r" values="3.2;4.2;3.2" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="56" cy="160" r={trailing === CREATE ? 3.2 : 2}>
          {trailing === CREATE && (
            <animate attributeName="r" values="3.2;4.2;3.2" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="264" cy="160" r={trailing === CRAFT ? 3.2 : 2}>
          {trailing === CRAFT && (
            <animate attributeName="r" values="3.2;4.2;3.2" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="160" cy="264" r={trailing === BECOME ? 3.2 : 2}>
          {trailing === BECOME && (
            <animate attributeName="r" values="3.2;4.2;3.2" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
      </g>
    </svg>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -80])
  const parallaxBg = useTransform(scrollY, [0, 500], [0, 40])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const animProps = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
    : { initial: { opacity: 0, y: 70, rotateX: -70 }, animate: { opacity: 1, y: 0, rotateX: 0 }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-cream"
    >
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { y: parallaxBg }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(249,246,241,0)_0%,_rgba(237,229,216,0.35)_70%,_rgba(232,223,208,0.45)_100%)]" />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-[0.018]"
        style={reducedMotion ? {} : { y: parallaxY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #2E1F16 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
      </motion.div>

      <div className="section-container relative z-10 w-full pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <motion.div
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 border border-brown-dark/10 rounded-full mb-6 sm:mb-8 bg-warm-white/60 backdrop-blur-sm shadow-soft"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reducedMotion ? 0.3 : 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reducedMotion && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tan/40" />
                )}
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-tan" />
              </span>
              <span className="text-[0.55rem] sm:text-[0.62rem] md:text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-brown-dark/80">
                Real Conversations · Real Growth
              </span>
            </motion.div>

            <div className="mb-3 sm:mb-4 overflow-hidden">
              <span className="block text-[0.7rem] sm:text-[0.78rem] md:text-[0.85rem] font-medium tracking-[0.18em] uppercase text-tan font-body">
                <motion.span
                  className="inline-block"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.18 }}
                >Life</motion.span>
                {' '}
                <motion.span
                  className="inline-block"
                  {...animProps}
                  transition={{ ...animProps.transition, delay: 0.26 }}
                >mitra</motion.span>
              </span>
            </div>

            <h1 className="font-display font-normal text-brown-dark leading-[1.02] tracking-[-0.025em] text-[clamp(2.6rem,6.2vw,5.2rem)] text-balance">
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={reducedMotion ? { opacity: 0 } : { y: '110%' }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: reducedMotion ? 0.4 : 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  Find clarity.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block italic font-light"
                  initial={reducedMotion ? { opacity: 0 } : { y: '110%' }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: reducedMotion ? 0.4 : 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  Build discipline.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={reducedMotion ? { opacity: 0 } : { y: '110%' }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: reducedMotion ? 0.4 : 0.85, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  Start your <span className="italic font-light text-tan">next chapter.</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              className="mt-6 sm:mt-8 mb-8 sm:mb-10 flex items-center gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reducedMotion ? 0.3 : 0.95 }}
            >
              <span className="h-px w-8 bg-tan/50" />
              <span className="text-[0.7rem] sm:text-[0.78rem] md:text-[0.85rem] font-medium tracking-[0.14em] uppercase text-brown-dark/85">
                By Sachin Chindarkar
              </span>
            </motion.div>

            <motion.p
              className="text-[clamp(0.95rem,1.6vw,1.18rem)] font-light text-text-secondary/90 max-w-lg leading-[1.65] mb-8 sm:mb-10 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reducedMotion ? 0.35 : 1.1 }}
            >
              Helping you move past confusion, self-doubt, and distraction —
              with grounded conversations and practical tools that create
              real, lasting change.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reducedMotion ? 0.4 : 1.25 }}
            >
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto btn-primary overflow-hidden"
                whileHover={reducedMotion ? undefined : { y: -2, boxShadow: '0 12px 30px -8px rgba(46, 31, 22, 0.25)' }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-tan/15 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Start Your Journey</span>
                <ArrowRight className="relative w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1 group-hover:rotate-[-25deg]" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('#services')}
                className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto btn-warm"
                whileHover={reducedMotion ? undefined : { y: -2 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              >
                <span>Know More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            <motion.ul
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mb-8 sm:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reducedMotion ? 0.45 : 1.45 }}
            >
              {PROOF_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5 text-[0.72rem] sm:text-[0.78rem] text-text-secondary/80">
                  <Icon className="w-3.5 h-3.5 text-tan" strokeWidth={1.5} />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>

            <motion.dl
              className="grid grid-cols-3 max-w-md mx-auto lg:mx-0 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-brown-dark/10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reducedMotion ? 0.5 : 1.55 }}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <dt className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-normal leading-none text-brown-dark">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <CrestAside />
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0.5 : 1.8, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] tracking-[0.18em] uppercase text-text-muted/70">Scroll</span>
        {!reducedMotion && (
          <motion.div
            className="w-px h-7 sm:h-9 bg-gradient-to-b from-tan/40 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.45, 0.18, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
    </section>
  )
}
