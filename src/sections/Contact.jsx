import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const orbRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(infoRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(formRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      )
      gsap.to(orbRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const tl = gsap.timeline()
    tl.to(formRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
      .call(() => setSent(true))
      .fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' })
  }

  const socials = [
    { name: 'GitHub', href: 'https://github.com/govindanaidu163-png', icon: '⌥' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/p-govinda-naidu-b75a6b389', icon: '⌘' },
    { name: 'Twitter', href: 'https://twitter.com/govindanaidu163-png', icon: '⌤' },
    { name: 'Dribbble', href: 'https://dribbble.com/govindanaidu163-png', icon: '◈' },
    { name: 'Instagram', href: 'https://instagram.com/govindanaidu163-png', icon: '◆' }
  ]

  return (
    <section ref={sectionRef} id="contact" className={styles.contact}>
      <div ref={orbRef} className={styles.orb} />

      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>Get In Touch</span>
          </div>
          <h2 className={styles.heading}>
            Let's build something<br />
            <span className={styles.accent}>extraordinary</span>
          </h2>
        </div>

        <div className={styles.body}>
          <div ref={infoRef} className={styles.info}>
            <p className={styles.infoText}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of something remarkable.
            </p>
            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>@</span>
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <a href="mailto:govindanaidu163@gmail.com" className={styles.infoValue}>govindanaidu163@gmail.com</a>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>⌖</span>
                <div>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>India</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>◉</span>
                <div>
                  <div className={styles.infoLabel}>Availability</div>
                  <div className={styles.infoValue} style={{ color: 'var(--accent-2)' }}>Open to projects</div>
                </div>
              </div>
            </div>
            <div className={styles.socials}>
              {socials.map(s => (
                <a 
                  key={s.name} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialBtn} 
                  aria-label={s.name}
              >
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <span className={styles.socialName}>{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div ref={formRef} className={styles.formWrap}>
            {!sent ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={`${styles.field} ${focused === 'name' ? styles.active : ''}`}>
                  <label className={styles.fieldLabel}>Your Name</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                  />
                  <div className={styles.fieldLine} />
                </div>
                <div className={`${styles.field} ${focused === 'email' ? styles.active : ''}`}>
                  <label className={styles.fieldLabel}>Email Address</label>
                  <input
                    type="email"
                    required
                    className={styles.input}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="john@example.com"
                  />
                  <div className={styles.fieldLine} />
                </div>
                <div className={`${styles.field} ${focused === 'message' ? styles.active : ''}`}>
                  <label className={styles.fieldLabel}>Message</label>
                  <textarea
                    required
                    className={`${styles.input} ${styles.textarea}`}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project..."
                    rows={5}
                  />
                  <div className={styles.fieldLine} />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  <span>Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 9h14M11 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            ) : (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Message Received</h3>
                <p className={styles.successText}>
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
                <button className={styles.resetBtn} onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}>
                  Send Another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
