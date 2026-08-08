import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionReveal, { StaggerItem } from '../ui/SectionReveal'

const FAQS = [
  {
    q: 'What is life coaching?',
    a: "Life coaching is a collaborative process that helps you gain clarity, overcome obstacles, and create actionable strategies to achieve your personal and professional goals. It's not therapy — it's forward-focused growth.",
  },
  {
    q: 'Who can benefit from life coaching?',
    a: "Anyone feeling stuck, confused, or ready for change can benefit. Whether you're dealing with self-doubt, lack of direction, career transitions, or relationship challenges, coaching provides the structure and accountability to move forward.",
  },
  {
    q: 'How do I know if coaching is right for me?',
    a: "If you're open to honest self-reflection, willing to take action, and want a structured approach to personal growth, coaching is likely a good fit. Book a free discovery call to explore if we're the right match.",
  },
  {
    q: 'What does a coaching session look like?',
    a: 'Sessions are typically 45-60 minutes, conducted via video call or in person. Each session focuses on your current challenges, explores underlying patterns, and creates clear action steps for the week ahead.',
  },
  {
    q: 'How many sessions will I need?',
    a: "Most clients see meaningful progress in 8-12 sessions. Some continue monthly for ongoing support, while others achieve their goals and transition to self-guided growth. It's entirely up to your pace and needs.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-warm-white py-14 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="gradient-border absolute top-0" />

      <div className="section-container relative">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <SectionReveal>
            <div className="section-label justify-center">
              <span className="before:hidden">Common Questions</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="section-title">
              Frequently Asked{' '}
              <span className="italic text-brown-light">Questions</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="section-desc mx-auto">
              Everything you need to know before your first session with Life Mitra.
            </p>
          </SectionReveal>
        </div>

        <SectionReveal className="max-w-2xl mx-auto space-y-3 sm:space-y-4" stagger={0.06}>
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <StaggerItem key={item.q}>
                <div className="card-warm rounded-2xl overflow-hidden">
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-tan"
                    >
                      <span className="font-display text-[0.98rem] sm:text-[1.05rem] font-medium text-brown-dark">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-shrink-0 w-7 h-7 rounded-full bg-tan/15 flex items-center justify-center"
                      >
                        <Plus className="w-3.5 h-3.5 text-brown-dark" strokeWidth={2} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-[0.92rem] text-text-secondary font-light leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            )
          })}
        </SectionReveal>
      </div>
    </section>
  )
}
