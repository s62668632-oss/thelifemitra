import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Send, Check, AlertCircle, Instagram, Youtube, Linkedin, Sparkles, Clock } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionReveal from '../ui/SectionReveal'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

const COURSES = [
  { value: '', label: 'Choose the work that fits' },
  { value: 'career-guidance', label: '01 · Career Guidance' },
  { value: 'public-speaking', label: '02 · Public Speaking' },
  { value: 'time-management', label: '03 · Time Management' },
  { value: 'stress-management', label: '04 · Stress Management' },
  { value: 'relationship-coaching', label: '05 · Relationship Coaching' },
  { value: 'emotional-healing', label: '06 · Emotional Healing' },
  { value: 'executive-communication', label: '07 · Executive Communication' },
  { value: 'business-startup-coaching', label: '08 · Business Startup Coaching' },
  { value: 'sales-management', label: '09 · Sales Management Workshop' },
  { value: 'law-of-attraction', label: '10 · Law of Attraction' },
  { value: 'other', label: '11 · Something else' },
]

const OCCUPATIONS = [
  { value: '', label: 'Select your occupation' },
  { value: 'organization', label: 'Organization' },
  { value: 'business', label: 'Business' },
  { value: 'student', label: 'Student' },
]

interface FormData {
  name: string
  email: string
  phone: string
  course: string
  occupation: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  course?: string
  message?: string
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    occupation: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name': return value.trim() ? undefined : 'Name is required'
      case 'email': {
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email'
        return undefined
      }
      case 'course': return value && value !== '' ? undefined : 'Please pick the area you want to work on'
      case 'message': return value.trim() ? undefined : 'Tell us a little about what you need'
      default: return undefined
    }
  }, [])

  const validate = useCallback((): FormErrors => {
    const fields: (keyof FormErrors)[] = ['name', 'email', 'course', 'message']
    const errs: FormErrors = {}
    for (const field of fields) {
      const err = validateField(field, formData[field])
      if (err) errs[field] = err
    }
    return errs
  }, [formData, validateField])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSubmitState('error')
      return
    }
    setErrors({})
    setSubmitState('sending')

    try {
      const courseLabel = COURSES.find(c => c.value === formData.course)?.label || formData.course

      const occupationLabel = OCCUPATIONS.find(o => o.value === formData.occupation)?.label || formData.occupation

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        course: courseLabel,
        occupation: occupationLabel,
        message: formData.message,
        to_email: 'info.Thelifemitra@gmail.com',
        subject: `New Inquiry: ${courseLabel} - ${formData.name}`,
        reply_to: formData.email,
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      setSubmitState('success')
      setFormData({ name: '', email: '', phone: '', course: '', occupation: '', message: '' })
      setTouched(new Set())
      setTimeout(() => setSubmitState('idle'), 6000)
    } catch {
      setSubmitState('error')
      setErrors({ message: 'We couldn’t send your message right now. Please try again or email us directly.' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched.has(name)) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    } else if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (field: keyof FormErrors) => {
    setFocusedField(null)
    setTouched(prev => new Set(prev).add(field))
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData[field]) }))
  }

  const inputClasses = (field: keyof FormErrors) => {
    const isTouched = touched.has(field)
    const isValid = isTouched && !errors[field]
    const hasError = errors[field]
    return `w-full rounded-xl px-4 py-3.5 text-[0.92rem] text-brown-dark font-light focus:outline-none transition-all duration-400 bg-warm-white border ${
      hasError
        ? 'border-red-400/60 focus:border-red-400'
        : isValid
          ? 'border-green-400/60'
          : 'border-brown-dark/[0.08] focus:border-tan/50'
    } ${focusedField === field ? 'bg-white' : ''}`
  }

  const inputFocusStyle = { boxShadow: '0 0 0 3px rgba(184, 151, 106, 0.1)' }

  const labels = {
    name: 'Your Name',
    email: 'Email Address',
    phone: 'Phone (optional)',
    course: 'Area You Want To Work On',
    occupation: 'Occupation',
    message: 'What would you like to change?',
  }
  const placeholders = {
    name: 'e.g. Sachin Chindarkar',
    email: 'you@example.com',
    phone: '+91 99999 99999',
    message: 'A few sentences about where you are and where you want to be.',
  }

  return (
    <section id="contact" className="relative bg-warm-white py-14 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="gradient-border absolute top-0" />

      <div
        className="absolute -top-12 -right-12 font-display italic text-[5rem] sm:text-[10rem] md:text-[16rem] text-brown-dark/[0.022] pointer-events-none select-none leading-[0.85] tracking-[-0.04em]"
        aria-hidden="true"
      >
        Connect
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16">
          <SectionReveal>
            <div className="section-label">Get in Touch</div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="section-title text-balance">
              Ready to{' '}
              <span className="italic text-brown-light">start your</span>{' '}
              <span className="italic font-light text-tan">next chapter?</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="section-desc">
              Real conversations begin in the first message — and that&rsquo;s where the work begins. Drop a note below; we&rsquo;ll reply within 24 hours.
            </p>
          </SectionReveal>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-10 lg:gap-14 items-start">
          <SectionReveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative">
                  <label htmlFor="name" className="sr-only">{labels.name}</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => handleBlur('name')}
                    placeholder={placeholders.name}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={inputClasses('name')}
                    style={focusedField === 'name' ? inputFocusStyle : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-[0.7rem] text-red-500 mt-1 ml-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.name}
                    </p>
                  )}
                  {touched.has('name') && !errors.name && (
                    <Check className="absolute right-3 top-3.5 w-4 h-4 text-green-500 pointer-events-none" aria-hidden="true" />
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="email" className="sr-only">{labels.email}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => handleBlur('email')}
                    placeholder={placeholders.email}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={inputClasses('email')}
                    style={focusedField === 'email' ? inputFocusStyle : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-[0.7rem] text-red-500 mt-1 ml-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.email}
                    </p>
                  )}
                  {touched.has('email') && !errors.email && (
                    <Check className="absolute right-3 top-3.5 w-4 h-4 text-green-500 pointer-events-none" aria-hidden="true" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] gap-4 sm:gap-5">
                <div className="relative">
                  <label htmlFor="phone" className="sr-only">{labels.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={placeholders.phone}
                    className={`w-full rounded-xl px-4 py-3.5 text-[0.92rem] text-brown-dark font-light focus:outline-none transition-all duration-400 bg-warm-white border border-brown-dark/[0.08] focus:border-tan/50 ${focusedField === 'phone' ? 'bg-white' : ''}`}
                    style={focusedField === 'phone' ? inputFocusStyle : undefined}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="course" className="sr-only">{labels.course}</label>
                  <select
                    name="course"
                    id="course"
                    value={formData.course}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('course')}
                    onBlur={() => handleBlur('course')}
                    required
                    aria-invalid={!!errors.course}
                    aria-describedby={errors.course ? 'course-error' : undefined}
                    className={`${inputClasses('course')} appearance-none cursor-pointer pr-10`}
                    style={focusedField === 'course' ? inputFocusStyle : undefined}
                  >
                    {COURSES.map((c) => (
                      <option key={c.value} value={c.value} disabled={!c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-tan/60 pointer-events-none"
                  >
                    ▾
                  </span>
                  {errors.course && (
                    <p id="course-error" className="text-[0.7rem] text-red-500 mt-1 ml-1 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.course}
                    </p>
                  )}
                  {touched.has('course') && !errors.course && formData.course && (
                    <Check className="absolute right-10 top-3.5 w-4 h-4 text-green-500 pointer-events-none" aria-hidden="true" />
                  )}
                </div>
              </div>

              <div className="relative">
                <label htmlFor="occupation" className="sr-only">{labels.occupation}</label>
                <select
                  name="occupation"
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('occupation')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full rounded-xl px-4 py-3.5 text-[0.92rem] text-brown-dark font-light focus:outline-none transition-all duration-400 bg-warm-white border border-brown-dark/[0.08] focus:border-tan/50 appearance-none cursor-pointer pr-10`}
                  style={focusedField === 'occupation' ? inputFocusStyle : undefined}
                >
                  {OCCUPATIONS.map((o) => (
                    <option key={o.value} value={o.value} disabled={!o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-tan/60 pointer-events-none"
                >
                  ▾
                </span>
              </div>

              <div className="relative">
                <label htmlFor="message" className="sr-only">{labels.message}</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => handleBlur('message')}
                  placeholder={placeholders.message}
                  required
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClasses('message')} resize-y`}
                  style={focusedField === 'message' ? inputFocusStyle : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-[0.7rem] text-red-500 mt-1 ml-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.message}
                  </p>
                )}
                {touched.has('message') && !errors.message && (
                  <Check className="absolute right-3 bottom-3.5 w-4 h-4 text-green-500 pointer-events-none" aria-hidden="true" />
                )}
              </div>

              <div
                role="status"
                aria-live="polite"
                className={`overflow-hidden rounded-2xl border transition-all duration-500 ease-expo-out ${
                  submitState === 'success' || submitState === 'error'
                    ? 'max-h-40 opacity-100 mt-2'
                    : 'max-h-0 opacity-0 mt-0'
                } ${
                  submitState === 'success'
                    ? 'border-tan/40 bg-tan/8'
                    : submitState === 'error'
                      ? 'border-red-400/30 bg-red-50/50'
                      : 'border-transparent'
                }`}
              >
                <div className="flex items-start gap-3 p-4">
                  {submitState === 'success' ? (
                    <Check className="w-5 h-5 text-tan flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`text-[0.85rem] font-medium ${submitState === 'success' ? 'text-brown-dark' : 'text-red-600'}`}>
                      {submitState === 'success' ? 'Message sent. We’ll reply within 24 hours.' : (errors.message || 'Please review the form and try again.')}
                    </p>
                    {submitState === 'success' && (
                      <p className="text-[0.78rem] text-text-secondary/80 mt-1">
                        Meanwhile, try our WhatsApp for an even faster reply.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-1">
                <motion.button
                  type="submit"
                  disabled={submitState === 'sending'}
                  className={`group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.08em] uppercase rounded-full overflow-hidden transition-all duration-400 ${
                    submitState === 'success'
                      ? 'bg-tan text-brown-dark border border-tan'
                      : submitState === 'sending'
                        ? 'bg-brown-dark/70 text-cream/80 border border-brown-dark/70 cursor-wait'
                        : 'bg-brown-dark text-cream border border-brown-dark hover:bg-transparent hover:text-brown-dark'
                  }`}
                  whileHover={submitState === 'sending' ? undefined : { scale: 1.02, boxShadow: submitState === 'success' ? undefined : '0 12px 28px -10px rgba(46, 31, 22, 0.3)' }}
                  whileTap={submitState === 'sending' ? undefined : { scale: 0.98 }}
                >
                  <span className="relative flex items-center gap-2">
                    {submitState === 'success' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Message Sent!
                      </>
                    ) : submitState === 'sending' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>
                </motion.button>
                <p className="text-[0.7rem] text-text-muted/80 italic">
                  Real person. Real reply. No autoresponders.
                </p>
              </div>
            </form>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <aside className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {[
                  { label: 'Phone', value: '+91 8097945878', icon: Phone, href: 'tel:+918097945878' },
                  { label: 'Email', value: 'info.Thelifemitra@gmail.com', icon: Mail, href: 'mailto:info.Thelifemitra@gmail.com' },
                  { label: 'Hours', value: 'Mon — Sat', icon: Clock },
                ].map((item, i) => {
                  const content = (
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-beige/60 flex items-center justify-center flex-shrink-0 group-hover:bg-brown-dark transition-all duration-500">
                        <item.icon className="w-4 h-4 text-brown-light group-hover:text-cream transition-colors duration-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-brown-light mb-1">
                          {item.label}
                        </p>
                        {'href' in item ? (
                          <a
                            href={item.href}
                            className="font-display text-[0.95rem] text-brown-dark hover:text-tan transition-colors duration-300 break-words block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-display text-[0.95rem] text-brown-dark break-words">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  )

                  return (
                    <motion.div
                      key={item.label}
                      className="group"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                    >
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-cream border border-brown-dark/[0.06] hover:border-tan/30 hover:shadow-card transition-all duration-400 ease-expo-out">
                        {content}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                className="relative rounded-2xl bg-brown-dark text-cream p-5 sm:p-6 shadow-floating overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-tan/15 blur-3xl" aria-hidden="true" />
                <div className="relative flex items-center gap-2 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-tan animate-pulse" />
                  <span className="text-[0.6rem] tracking-[0.22em] uppercase font-semibold text-tan/85">
                    What happens next
                  </span>
                </div>
                <div className="relative font-display italic text-[clamp(1.1rem,1.8vw,1.35rem)] leading-[1.25] text-cream/95 text-balance mb-4">
                  You'll get a human reply within 24 hours.
                </div>
                <ul className="relative space-y-2">
                  {[
                    { icon: Check, text: 'You’ll hear from Sachin, not a bot.' },
                    { icon: Check, text: 'A 20-min discovery call if it fits.' },
                    { icon: Check, text: 'No pitch. No pressure.' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5 text-[0.82rem] text-cream/75">
                      <Icon className="w-4 h-4 text-tan mt-0.5 flex-shrink-0" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-tan/70 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Follow The Work
                </p>
                <div className="flex gap-2">
                  {[
                    { platform: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
                    { platform: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
                    { platform: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
                  ].map(({ platform, icon: Icon, href }, i) => (
                    <motion.a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social relative w-11 h-11 border border-brown-dark/[0.08] rounded-xl flex items-center justify-center text-text-muted/60 overflow-hidden hover:border-tan/25 transition-all duration-300"
                      whileHover={{ y: -2, scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.75 + i * 0.06 }}
                      aria-label={`Follow us on ${platform}`}
                    >
                      <span className="absolute inset-0 bg-gradient-to-br from-tan to-gold opacity-0 group-hover/social:opacity-100 transition-opacity duration-400" aria-hidden="true" />
                      <Icon className="relative w-4 h-4 text-text-muted/60 group-hover/social:text-brown-dark transition-colors duration-300" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </aside>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
