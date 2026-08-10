import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionReveal from '../ui/SectionReveal'

const workExperienceItems = [
  'Trained in Germany, Japan, Singapore, Switzerland on various technical & sales training',
  'Worked with HAL – Lucknow, HAL – Kanpur, India Navy, BARC, IIT Bombay, Ordinance factory for Govt Project',
  'Worked for few Dubai, Sharjah based engineering MNC as a sales trainer',
  'Worked with Indian MNC in food & barrage industries, Pharma & Scientific industries as a coach, mentor, motivational speaker',
  'Worked with 100+ start up companies in India and help them to achieve their goals',
  'Running his own Indian MNC in scientific & lab equipment\'s business',
  'Worked with 100+ colleges & schools in India and guided 1000+ students for career related issues, public speaking, personality development, time management',
]

const TIMELINE = [
  { band: 'Foundations', years: 'Early years', title: 'Newspaper boy · JVLR Jogeshwari', body: 'Discipline, grit, and lessons money can\'t buy — the unglamorous start that built the work ethic.' },
  { band: 'Corporate', years: 'Two decades', title: 'Mahindra · Godrej · Swiss & US MNCs', body: 'Sales, leadership, communication. An MBA that became a working vocabulary, not a wall certificate.' },
  { band: 'Founder', years: 'Since 2010', title: 'Built his own Indian MNC', body: 'Scientific & pharma instrumentation, scaled from a desk to a 15-year-old enterprise he still runs.' },
  { band: 'Mentor', years: 'Present', title: 'Coach · Trainer · Stage Anchor', body: '250+ stages, 10+ countries, 100+ startups, 1000+ students. The work that brought him here.' },
]

const CREDENTIALS = [
  { label: 'Vocal Coach', sub: 'Voice · Tone · Presence' },
  { label: 'Business Mentor', sub: 'Strategy · Scale · Discipline' },
  { label: 'Stage Anchor', sub: '250+ Shows · 10+ Countries' },
]

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const scrollAbout = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [reduceMotion])

  return (
    <section id="about" className="relative bg-warm-white py-14 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="gradient-border absolute top-0" />

      <div
        className="absolute -top-4 -right-6 sm:-top-8 sm:-right-12 font-display italic text-[6rem] sm:text-[12rem] md:text-[18rem] text-brown-dark/[0.022] pointer-events-none select-none leading-[0.85] tracking-[-0.04em]"
        aria-hidden="true"
      >
        Story
      </div>

      <div className="absolute -left-20 top-1/2 w-64 h-64 rounded-full bg-tan/8 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="section-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-start">
          <div className="max-w-2xl">
            <SectionReveal>
              <div className="section-label">About The Coach</div>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <h2 className="section-title text-balance">
                From humble beginnings to{' '}
                <span className="italic text-brown-light">guiding others</span>{' '}
                <span className="text-tan">—</span>{' '}
                <span className="italic font-light">one real conversation at a time.</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="space-y-4 sm:space-y-5 text-text-secondary font-light leading-relaxed text-[0.92rem] sm:text-[0.98rem] md:text-[1.05rem] mb-6 sm:mb-8">
                <p>
                  I am <span className="text-brown-dark font-medium">Mr. Sachin Chindarkar</span> — founder of{' '}
                  <span className="text-brown-dark font-medium">The Life Mitra</span>. With grace and a few lucky breaks,
                  people know me as a multifaceted coach: vocal stylist, communicator, and lifestyle mentor.
                </p>
                <p>
                  The newsboy from the lanes of Jogeshwari — the one who ran the JVLR stretch every morning —
                  to the founder of a 15-year-old Indian MNC serving pharma and scientific industries. The
                  journey was unusual. The work always came back to the same thing: <em>showing up</em>.
                </p>
                <p>
                  Engineering and MBA by qualification —{' '}
                  <span className="text-brown-dark font-medium">Mahindra & Mahindra</span>,{' '}
                  <span className="text-brown-dark font-medium">Godrej Aerospace</span>, and a handful of
                  Swiss & US MNCs along the way — followed by <em>years of hands-on coaching, training,
                  and mentoring</em>, alongside continued self-study in psychology, voice, body language,
                  and behaviour.
                </p>
                <p className="text-brown-dark/85 font-normal border-l-2 border-tan/40 pl-4 sm:pl-5 italic">
                  "Throughout my career, the privilege has been the same: helping people move from{' '}
                  <span className="text-brown-dark/60 not-italic line-through decoration-tan/60">good</span>{' '}
                  to <span className="text-tan not-italic font-medium">better</span>, and eventually to the{' '}
                  <span className="text-brown-dark not-italic font-semibold">best</span>."
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.22}>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
                {CREDENTIALS.map((c, i) => (
                  <motion.li
                    key={c.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    className="group relative px-3.5 py-3 rounded-2xl bg-cream border border-brown-dark/[0.06] hover:border-tan/30 hover:shadow-soft transition-all duration-400 ease-expo-out"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="h-1 w-1 rounded-full bg-tan" />
                      <span className="text-[0.6rem] tracking-[0.18em] uppercase font-semibold text-tan/85">
                        {c.label}
                      </span>
                    </div>
                    <span className="text-[0.78rem] text-brown-dark/80 font-light leading-snug block">
                      {c.sub}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.18}>
            <div className="relative lg:sticky lg:top-28">
              <div className="relative rounded-[2rem] bg-brown-dark text-cream p-7 sm:p-9 shadow-floating overflow-hidden">
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-tan/20 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />

                <div className="relative flex items-center justify-between mb-6">
                  <span className="text-[0.6rem] tracking-[0.28em] uppercase font-medium text-tan/85">
                    In his own words
                  </span>
                  <Quote className="w-5 h-5 text-tan/60" strokeWidth={1.25} />
                </div>

                <div className="relative">
                  <div className="font-display italic text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.18] text-cream/95 tracking-[-0.01em] text-balance">
                    "The work is simple. Show up, do the reps, take the next step. Most people quit before
                    that step. I just help them take one more."
                  </div>
                </div>

                <div className="relative mt-7 pt-5 border-t border-cream/10 flex items-end justify-between gap-3">
                  <div>
                    <div className="font-display italic text-[1.15rem] text-cream leading-none">
                      Sachin Chindarkar
                    </div>
                    <div className="text-[0.68rem] tracking-[0.18em] uppercase text-tan/70 mt-1.5">
                      Founder · Life Mitra
                    </div>
                  </div>
                  <motion.div
                    aria-hidden="true"
                    className="font-display italic text-tan/30 text-[3.2rem] leading-none -mb-2 select-none"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    SC
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mt-3.5">
                {[
                  { v: '250+', l: 'Stages' },
                  { v: '10+', l: 'Countries' },
                  { v: '1000+', l: 'Students' },
                ].map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="rounded-2xl bg-cream border border-brown-dark/[0.06] px-3 py-3 text-center"
                  >
                    <div className="font-display text-[clamp(1.05rem,1.8vw,1.4rem)] leading-none text-brown-dark">
                      {s.v}
                    </div>
                    <div className="text-[0.6rem] tracking-[0.18em] uppercase text-text-muted mt-1.5">
                      {s.l}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.25}>
          <div className="mt-16 sm:mt-20 md:mt-24">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brown-dark/15 to-transparent" />
              <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.28em] uppercase font-semibold text-tan">
                The arc of the work
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brown-dark/15 to-transparent" />
            </div>

            <h3 className="font-display text-display-md font-normal text-brown-dark mb-8 sm:mb-10 text-balance">
              Four chapters. <span className="italic text-tan">One thread.</span>
            </h3>

            <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              <span
                className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-tan/40 to-transparent"
                aria-hidden="true"
              />
              {TIMELINE.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="group relative bg-cream rounded-2xl p-5 sm:p-6 border border-brown-dark/[0.05] hover:border-tan/25 hover:shadow-card transition-all duration-500 ease-expo-out"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-display italic text-tan text-[0.95rem] tracking-wide">
                      0{i + 1}
                    </span>
                    <span className="text-[0.58rem] tracking-[0.22em] uppercase font-medium text-text-muted">
                      {step.years}
                    </span>
                  </div>

                  <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-tan ring-4 ring-cream"
                  />

                  <div className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-brown-light mb-2">
                    {step.band}
                  </div>
                  <div className="font-display text-[1.05rem] sm:text-[1.12rem] leading-[1.25] text-brown-dark mb-3 text-balance">
                    {step.title}
                  </div>
                  <p className="text-[0.85rem] text-text-secondary font-light leading-relaxed">
                    {step.body}
                  </p>
                </motion.li>
              ))}
            </ol>

            <div className="mt-10 sm:mt-12">
              <h4 className="font-display text-lg sm:text-xl font-medium text-brown-dark mb-4 sm:mb-5">
                Selected work
              </h4>
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => scrollAbout('left')}
                  className="flex-shrink-0 w-11 h-11 rounded-full bg-cream border border-brown-dark/10 flex items-center justify-center text-brown-dark hover:bg-brown-dark hover:text-cream transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tan"
                  aria-label="Scroll selected work left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="relative flex-1 min-w-0">
                  <div
                    ref={scrollRef}
                    className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {workExperienceItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 w-[calc(100vw-5.5rem)] sm:w-[260px] md:w-72 snap-start bg-cream rounded-xl p-4 sm:p-5 border border-brown-dark/[0.04] hover:border-tan/20 hover:shadow-soft transition-all duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-tan/60 mt-2 flex-shrink-0" />
                          <p className="text-sm text-text-secondary font-light leading-relaxed">{item}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => scrollAbout('right')}
                  className="flex-shrink-0 w-11 h-11 rounded-full bg-cream border border-brown-dark/10 flex items-center justify-center text-brown-dark hover:bg-brown-dark hover:text-cream transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tan"
                  aria-label="Scroll selected work right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
