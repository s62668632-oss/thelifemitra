import { motion } from 'framer-motion'
import { ArrowUp, Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { scrollToSection, scrollToTop } from '../../lib/scroll'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { platform: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/thelifemitra6' },
]

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (location.pathname === '/') {
      scrollToSection(href)
    } else {
      navigate(`/${href}`)
    }
  }

  return (
    <footer className="relative bg-brown-dark text-cream overflow-hidden">
      <div
        className="absolute -top-32 left-1/3 w-[420px] h-[420px] rounded-full bg-tan/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 right-1/4 w-[380px] h-[380px] rounded-full bg-gold/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="flex items-start gap-6 sm:gap-8 lg:gap-12 pt-12 sm:pt-14 md:pt-20 pb-8 sm:pb-10 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-[1.3]"
          >
            <img
              src="/logo.png"
              alt="Life Mitra"
              className="h-10 sm:h-11 md:h-12 w-auto bg-cream rounded-lg p-2 mb-4 sm:mb-5"
              loading="lazy"
              width={120}
              height={48}
            />
            <p className="font-display italic text-cream/95 text-[clamp(1.05rem,1.6vw,1.35rem)] leading-[1.35] mb-3 sm:mb-4 max-w-sm text-balance">
              Real conversations.
              <br />
              <span className="text-tan">Real growth.</span>{' '}
              Real transformation.
            </p>
            <p className="text-[0.78rem] text-cream/45 leading-relaxed max-w-xs">
              The Life Mitra — a practice devoted to the work of becoming, one real conversation at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="flex-1 min-w-[140px]"
          >
            <p className="text-[0.6rem] tracking-[0.24em] uppercase font-semibold text-tan/75 mb-4 sm:mb-5">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5 sm:space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group inline-flex items-center gap-2 text-[0.85rem] text-cream/55 hover:text-cream transition-colors duration-300"
                    >
                      <span className="h-px w-3 bg-cream/20 group-hover:w-6 group-hover:bg-tan transition-all duration-400 ease-expo-out" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="flex-1 min-w-[180px]"
          >
            <p className="text-[0.6rem] tracking-[0.24em] uppercase font-semibold text-tan/75 mb-4 sm:mb-5">
              Reach Out
            </p>
            <ul className="space-y-3 sm:space-y-3.5">
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-tan mt-1 flex-shrink-0" />
                <a
                  href="tel:+918097945878"
                  className="text-[0.85rem] text-cream/75 hover:text-cream transition-colors duration-300 leading-snug"
                >
                  +91 8097945878
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-tan mt-1 flex-shrink-0" />
                <a
                  href="mailto:info.Thelifemitra@gmail.com"
                  className="text-[0.78rem] text-cream/75 hover:text-cream transition-colors duration-300 leading-snug break-all"
                >
                  info.Thelifemitra@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-tan mt-1 flex-shrink-0" />
                <span className="text-[0.85rem] text-cream/75 leading-snug">
                  Mumbai · Pune · India
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="flex-1.1 min-w-[180px]"
          >
            <p className="text-[0.6rem] tracking-[0.24em] uppercase font-semibold text-tan/75 mb-4 sm:mb-5">
              Start Here
            </p>
            <p className="font-display italic text-cream/85 text-[0.95rem] leading-[1.45] mb-4 sm:mb-5 max-w-[230px] text-balance">
              Real change starts with one real conversation.
            </p>
            <motion.button
              onClick={() => (location.pathname === '/' ? scrollToSection('#contact') : navigate('/#contact'))}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3 bg-tan text-brown-dark text-[0.7rem] font-medium tracking-[0.1em] uppercase rounded-full hover:bg-cream transition-colors duration-300"
              whileHover={{ y: -2, boxShadow: '0 12px 30px -8px rgba(184, 151, 106, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Begin Now
            </motion.button>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 py-5 sm:py-6 border-t border-cream/8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex items-center gap-2.5"
            aria-label="Social media"
          >
            {socialLinks.map(({ platform, icon: Icon, href }, i) => (
              <motion.a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social w-9 h-9 rounded-full border border-cream/10 flex items-center justify-center text-cream/40 hover:text-cream hover:border-cream/30 transition-all duration-400"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.36 + i * 0.06 }}
                aria-label={`Follow us on ${platform}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[0.65rem] text-cream/35 tracking-wide order-first sm:order-none"
          >
            &copy; {new Date().getFullYear()} Life Mitra. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="group w-11 h-11 rounded-full border border-cream/10 flex items-center justify-center text-cream/45 hover:text-cream hover:border-cream/30 hover:bg-cream/5 transition-all duration-400"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-400 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
