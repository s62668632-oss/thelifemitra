import { motion } from 'framer-motion'
import { Compass, Mic, MessageSquare, Clock, Brain, Heart, Lightbulb, Rocket, BarChart3, Phone, Check, ArrowRight } from 'lucide-react'
import SectionReveal, { StaggerItem } from '../ui/SectionReveal'
import { scrollToSection } from '../../lib/scroll'

const services = [
  { icon: Compass, title: 'Career Guidance', desc: 'Find clarity and direction in your professional journey.', features: ['Personalized assessment', 'Action roadmap', 'Follow-up support'] },
  { icon: Mic, title: 'Public Speaking', desc: 'Develop confidence and impact in front of any audience.', features: ['Voice modulation techniques', 'Stage presence training', 'Real-world practice'] },
  { icon: Clock, title: 'Time Management', desc: 'Build structure, consistency, and discipline in daily life.', features: ['Priority frameworks', 'Productivity systems', 'Habit building'] },
  { icon: Brain, title: 'Stress Management', desc: 'Learn practical techniques to manage pressure and anxiety.', features: ['Mindfulness practices', 'Coping strategies', 'Resilience building'] },
  { icon: Heart, title: 'Relationship Coaching', desc: 'Strengthen connections and build healthier relationships.', features: ['Communication skills', 'Conflict resolution', 'Trust building'] },
  { icon: Lightbulb, title: 'Emotional Healing', desc: 'Release emotional blocks and restore inner peace.', features: ['Guided reflection', 'Healing techniques', 'Inner peace practices'] },
]

const popularSessions = [
  {
    icon: MessageSquare,
    title: 'Executive Communication',
    desc: 'Master the art of clear, powerful communication.',
    features: ['Leadership messaging', 'Boardroom strategies', 'Executive presence'],
  },
  {
    icon: Lightbulb,
    title: 'Law of Attraction',
    desc: 'Harness the power of mindset to attract what you desire.',
    features: ['Mindset transformation', 'Visualization mastery', 'Manifestation frameworks', 'Personal mentoring'],
  },
  {
    icon: Rocket,
    title: 'Business Startup Coaching',
    desc: 'From idea to execution — build your business with confidence.',
    features: ['Business model design', 'Market validation', 'Launch strategy', 'Growth planning'],
  },
  {
    icon: BarChart3,
    title: 'Sales Management Workshop',
    desc: 'Practical strategies to elevate your sales performance.',
    features: ['Sales psychology', 'Pipeline management', 'Closing techniques', 'Team leadership'],
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-cream py-14 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <SectionReveal>
            <div className="section-label justify-center">
              <span className="before:hidden">What We Offer</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="section-title">
              Services We{' '}
              <span className="italic text-brown-light">Provide</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="section-desc mx-auto">
              Practical, experience-driven coaching designed to help you overcome obstacles and build the life you deserve.
            </p>
          </SectionReveal>
        </div>

        <SectionReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-14 sm:mb-20 md:mb-24" stagger={0.06}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <motion.div
                className="group relative bg-warm-white rounded-2xl p-5 sm:p-6 md:p-7 border border-brown-dark/[0.06] hover:border-tan/30 hover:shadow-xl hover:shadow-tan/5 transition-all duration-500 h-full flex flex-col"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-beige to-tan/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:from-brown-dark group-hover:to-brown-dark/90 transition-all duration-500">
                  <service.icon className="w-5 h-5 text-brown-light group-hover:text-cream group-hover:scale-110 transition-all duration-500" />
                </div>
                <h3 className="font-display text-base sm:text-[1.05rem] font-medium text-brown-dark mb-1.5 sm:mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary/70 font-light leading-relaxed mb-4 flex-grow">
                  {service.desc}
                </p>
                <div className="pt-4 border-t border-brown-dark/[0.06] mt-auto">
                  <ul className="space-y-1.5 sm:space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs sm:text-[0.8rem] text-text-secondary">
                        <Check className="w-3.5 h-3.5 text-tan mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-brown-dark/5 text-brown-dark text-xs sm:text-[0.8rem] font-medium rounded-lg border border-brown-dark/10 hover:bg-brown-dark hover:text-cream hover:border-brown-dark hover:shadow-md transition-all duration-300"
                  >
                    Book Now
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </SectionReveal>

        <div className="w-full">
          <SectionReveal>
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-tan/30 rounded-full bg-gradient-to-r from-tan/5 to-tan/10 mb-3 sm:mb-4">
                <span className="h-1 w-1 rounded-full bg-tan animate-pulse" />
                <span className="text-[0.6rem] sm:text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-tan">
                  Most Popular
                </span>
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-brown-dark mt-3 sm:mt-4 text-balance">
                Premium coaching for the{' '}
                <span className="italic text-brown-light">next level of work.</span>
              </h3>
              <p className="text-sm sm:text-[0.95rem] text-text-secondary/75 font-light mt-3 max-w-md mx-auto">
                Four sessions that clients return to most often. No trial gimmicks — just the work that ships results.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-14 md:mb-16" stagger={0.07}>
            {popularSessions.map((session) => (
              <StaggerItem key={session.title}>
                <motion.div
                  className="group relative bg-brown-dark text-cream rounded-2xl overflow-hidden h-full flex flex-col shadow-xl"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-tan via-tan/80 to-tan" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-br from-tan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                  <div className="relative p-5 sm:p-6 md:p-7 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4 sm:mb-5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-tan/20 group-hover:bg-tan/30 transition-all duration-500">
                        <session.icon className="w-5 h-5 text-tan" />
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-tan/15 text-tan text-[0.6rem] font-semibold tracking-wider uppercase rounded-full border border-tan/25">
                        <span className="h-1 w-1 rounded-full bg-tan animate-pulse" />
                        Most Popular
                      </span>
                    </div>

                    <h4 className="font-display text-lg sm:text-[1.15rem] font-medium text-cream mb-1.5 sm:mb-2">
                      {session.title}
                    </h4>
                    <p className="text-sm text-cream/55 font-light leading-relaxed mb-5">
                      {session.desc}
                    </p>

                    <div className="pt-4 sm:pt-5 border-t border-cream/10 mt-auto">
                      <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
                        {session.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-cream/75">
                            <Check className="w-4 h-4 text-tan mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => scrollToSection('#contact')}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3 text-xs sm:text-[0.75rem] font-medium tracking-wide uppercase rounded-lg bg-tan text-brown-dark hover:bg-cream hover:shadow-lg transition-all duration-300"
                      >
                        Get Started
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="text-center space-y-4 sm:space-y-5">
              <p className="text-sm text-text-secondary/70 font-light italic px-4">
                &ldquo;Develop structure, consistency, and discipline in daily life.&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
                <a
                  href="tel:+918097945878"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-brown-dark text-cream text-[0.72rem] font-medium tracking-[0.06em] uppercase rounded-full border border-brown-dark overflow-hidden transition-all duration-400 ease-expo-out hover:bg-transparent hover:text-brown-dark"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 8097945878</span>
                </a>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-warm text-[0.72rem] px-6 py-3.5 w-full sm:w-auto"
                >
                  Know More
                </button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
