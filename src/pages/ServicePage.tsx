import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react'
import { getServiceBySlug, SERVICES } from '../data/services'
import { useDocumentHead } from '../hooks/useDocumentHead'

const SITE_URL = 'https://www.thelifemitra.com'

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined
  const canonical = `${SITE_URL}/services/${slug ?? ''}`

  useDocumentHead({
    title: service?.metaTitle ?? 'The Life Mitra',
    description: service?.metaDescription ?? '',
    canonical,
    ogImage: `${SITE_URL}/og-image.png`,
    jsonLd: service
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          description: service.metaDescription,
          url: canonical,
          areaServed: [
            { '@type': 'City', name: 'Mumbai' },
            { '@type': 'City', name: 'Pune' },
          ],
          provider: { '@id': `${SITE_URL}/#business` },
        }
      : undefined,
  })

  if (!service) {
    return <Navigate to="/" replace />
  }

  const related = SERVICES.filter((s) => service.relatedSlugs.includes(s.slug))

  return (
    <section className="relative bg-cream py-24 sm:py-28 md:py-32 overflow-hidden">
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-[0.78rem] text-text-secondary/70 hover:text-brown-dark transition-colors duration-300 mb-8 sm:mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Services
          </Link>

          <div className="section-label">Coaching Service</div>
          <h1 className="font-display text-display-lg font-normal text-brown-dark leading-[1.1] tracking-[-0.02em] mb-5 sm:mb-6 max-w-2xl text-balance">
            {service.h1}
          </h1>
          <p className="text-body-lg font-light text-text-secondary max-w-2xl leading-relaxed mb-12 sm:mb-16">
            {service.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-14"
            >
              <h2 className="font-display text-display-md font-normal text-brown-dark mb-5 sm:mb-6">
                Who this is for
              </h2>
              <ul className="space-y-3">
                {service.whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-text-secondary font-light leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-tan mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-14"
            >
              <h2 className="font-display text-display-md font-normal text-brown-dark mb-5 sm:mb-6">
                What you'll work on
              </h2>
              <div className="space-y-5 sm:space-y-6">
                {service.whatYoullWork.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <Check className="w-4 h-4 text-tan mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-[1.02rem] font-medium text-brown-dark mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[0.9rem] text-text-secondary/85 font-light leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-warm-white rounded-2xl border border-brown-dark/[0.06] p-6 sm:p-7"
            >
              <p className="text-[0.92rem] text-text-secondary font-light leading-relaxed italic">
                {service.approachNote}
              </p>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28 rounded-[2rem] bg-brown-dark text-cream p-7 sm:p-8 shadow-floating"
            >
              <h2 className="font-display italic text-[1.4rem] text-cream mb-3 text-balance">
                Ready to start with {service.name.toLowerCase()}?
              </h2>
              <p className="text-[0.85rem] text-cream/70 font-light leading-relaxed mb-6">
                A 20-minute discovery call to understand what you actually need — no scripts, no sales pitch.
              </p>
              <Link
                to="/#contact"
                className="group inline-flex items-center justify-center gap-2.5 w-full px-6 py-3.5 bg-tan text-brown-dark text-[0.72rem] font-medium tracking-[0.08em] uppercase rounded-full hover:bg-cream transition-colors duration-300 mb-3"
              >
                Book a Free Discovery Call
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
              <a
                href="tel:+918097945878"
                className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-[0.75rem] font-medium text-cream/80 hover:text-cream transition-colors duration-300"
              >
                <Phone className="w-3.5 h-3.5" />
                +91 8097945878
              </a>
            </motion.div>

            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <h3 className="text-[0.6rem] tracking-[0.24em] uppercase font-semibold text-brown-light mb-3">
                  Related Services
                </h3>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/services/${r.slug}`}
                        className="group flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-warm-white border border-brown-dark/[0.06] hover:border-tan/30 transition-all duration-300"
                      >
                        <span className="text-[0.85rem] text-brown-dark font-medium">{r.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-tan group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
