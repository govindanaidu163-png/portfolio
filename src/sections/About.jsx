import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '60+', label: 'Projects Shipped' },
  { value: '12+', label: 'Happy Clients' },
  { value: '∞', label: 'Coffee Consumed' },
]

export default function About() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const imageRef = useRef(null)
  const orbRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo(textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      )
      gsap.fromTo(Array.from(statsRef.current?.children || []),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.12,
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(imageRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )

      // Parallax orb
      gsap.to(orbRef.current, {
        y: -60,
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

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div ref={orbRef} className={styles.orb} />

      <div className={styles.container}>
        <div className={styles.left}>
          <div ref={labelRef} className={styles.label}>
            <span className={styles.labelLine} />
            <span>About Me</span>
          </div>

          <h2 ref={headingRef} className={styles.heading}>
            Building at the<br />
            <span className={styles.accent}>edge of imagination</span>
          </h2>

          <div ref={textRef} className={styles.textBlock}>
            <p>
              I'm a full-stack developer obsessed with the intersection of technology and artistic expression.
              With 5+ years of crafting digital experiences, I specialize in creating immersive 3D web applications
              that push the boundaries of what's possible in the browser.
            </p>
            <p>
              My work combines deep technical expertise with an obsessive eye for aesthetic detail.
              Whether it's a WebGL visualization, a complex animation system, or a performant React application —
              I believe every pixel and every frame matters.
            </p>
            <p>
              Currently available for select freelance projects and collaborations with forward-thinking studios and startups.
            </p>
          </div>

          <div ref={statsRef} className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={imageRef} className={styles.right}>
          <div className={styles.imageWrap}>
            <div className={styles.imagePlaceholder}>
              <div className={styles.imageGlow} />
              <div className={styles.imageGrid}>
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className={styles.gridCell} />
                ))}
              </div>
              <div className={styles.imageCenter}>
                <div className={styles.avatarRing} />
                <div className={styles.avatarRing2} />
                <div className={styles.avatarInitials}>AD</div>
              </div>
            </div>
            <div className={styles.floatBadge}>
              <span className={styles.badgeDot} />
              <span>Open to work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
