import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Compass, TrendingUp } from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'
import { scrollToSection } from '../../lib/scroll'

const STEPS = [
  {
    n: '01',
    icon: MessageCircle,
    title: 'Real Talk',
    body: 'A 20-min discovery call to understand what you actually need — no scripts, no sales pitch.',
    sub: 'Day 0 · 20 min',
  },
  {
    n: '02',
    icon: Compass,
    title: 'A Roadmap',
    body: 'A clear, honest plan of how we work together — usually a 6 to 12 week arc with weekly touchpoints.',
    sub: 'Within 48 hours',
  },
  {
    n: '03',
    icon: TrendingUp,
    title: 'Noticeable Change',
    body: 'You start showing up differently. By week three, your people notice. By week eight, you do.',
    sub: 'From week 3',
  },
]

export default function BuildLife() {
  return (
    <section className="relative bg-warm-white py-14 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="gradient-border absolute top-0" />

      <div
        className="absolute -left-20 -top-10 w-72 h-72 rounded-full bg-tan/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 bottom-0 w-80 h-80 rounded-full bg-gold/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 border border-brown-dark/10 rounded-full mb-5 sm:mb-6 bg-warm-white/70 backdrop-blur-sm shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-tan animate-pulse" />
              <span className="text-[0.55rem] sm:text-[0.62rem] md:text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-brown-dark/80">
                Your Transformation Starts Here
              </span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] sm:text-display-lg font-normal text-brown-dark leading-[1.08] sm:leading-[1.1] tracking-[-0.025em] mb-4 sm:mb-5 text-balance">
              Build the life you{' '}
              <span className="italic text-brown-light">actually</span>{' '}
              want.{' '}
              <span className="italic font-light text-tan">One step at a time.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-[0.95rem] md:text-[1.05rem] font-light text-text-secondary/85 leading-[1.65] max-w-lg mx-auto">
              Whether you&rsquo;re feeling lost, stuck, or simply seeking the next level —
              coaching works because the work is real, and the plan is honest.
            </p>
          </SectionReveal>
        </div>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-14 md:mb-16 relative" stagger={0.08}>
          <span
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-tan/40 to-transparent"
            aria-hidden="true"
          />

          {STEPS.map((step) => (
            <motion.div
              key={step.n}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-cream rounded-2xl p-6 sm:p-7 md:p-8 border border-brown-dark/[0.06] hover:border-tan/30 hover:shadow-card-hover transition-all duration-500 ease-expo-out text-left"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-display italic text-tan text-[1.05rem] tracking-wide">
                  {step.n}
                </span>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-beige to-tan/20 flex items-center justify-center group-hover:from-brown-dark group-hover:to-brown-dark/90 transition-all duration-500">
                  <step.icon className="w-5 h-5 text-brown-light group-hover:text-cream group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              <h3 className="font-display text-display-md font-normal text-brown-dark leading-[1.15] tracking-[-0.01em] mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary/80 font-light leading-relaxed mb-4 text-balance">
                {step.body}
              </p>

              <div className="pt-4 border-t border-brown-dark/[0.06] flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-tan" />
                <span className="text-[0.6rem] tracking-[0.18em] uppercase font-medium text-text-muted">
                  {step.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="text-center">
            <div className="relative inline-block">
              <div
                className="absolute inset-0 rounded-full bg-brown-dark/6 animate-pulse-ring pointer-events-none"
                style={{ margin: '-6px' }}
              />
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto px-8 sm:px-9 py-4 bg-brown-dark text-cream text-[0.7rem] sm:text-[0.72rem] font-medium tracking-[0.08em] uppercase rounded-full border border-brown-dark overflow-hidden"
                whileHover={{ scale: 1.04, boxShadow: '0 16px 40px -8px rgba(46, 31, 22, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-tan/20 via-gold/20 to-tan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Book a Free Discovery Call</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-400 group-hover:translate-x-1" />
              </motion.button>
            </div>
            <p className="text-[0.7rem] sm:text-[0.75rem] text-text-muted mt-4 italic">
              No commitment. 20 minutes. Real answers.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
