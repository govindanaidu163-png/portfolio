import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from '../components/Scene'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const tagsRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollYRef = useRef(0)

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Entrance animation
    const tl = gsap.timeline({ delay: 2.5 })
    const headingChars = headingRef.current?.querySelectorAll('.char')
    if (headingChars?.length) {
      tl.fromTo(headingChars,
        { y: 120, opacity: 0, rotateX: -80 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.04, ease: 'expo.out' }
      )
    }
    tl.fromTo(subRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      '-=0.6'
    )
    tl.fromTo(tagsRef.current?.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' },
      '-=0.5'
    )
    tl.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
      '-=0.4'
    )
    tl.fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.2'
    )

    // Scroll parallax
    gsap.to(headingRef.current, {
      y: -80,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '15% top',
        scrub: 1
      }
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block', willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section ref={sectionRef} id="hero" className={styles.hero}>
      <Scene mouseRef={mouseRef} scrollY={scrollYRef} />

      <div className={styles.content}>
        <div className={styles.topLabel}>
          <span className={styles.labelDot} />
          <span>Creative Developer</span>
        </div>

        <h1 
       ref={headingRef} 
       className={styles.heading} 
       style={{ perspective: '1000px', position: "relative", zIndex: 10 }}
>
          <div className={styles.headingLine}>{splitText('CRAFTING')}</div>
          <div className={styles.headingLine}>
            <span className={styles.gradientText}>{splitText('DIGITAL')}</span>
          </div>
          <div className={styles.headingLine}>{splitText('WORLDS')}</div>
        </h1>

        <p ref={subRef} className={styles.sub}>
          Full-stack developer & 3D experience designer.
          <br />
          Building immersive interfaces at the intersection of art & tech.
        </p>

        <div ref={tagsRef} className={styles.tags}>
          {['Three.js', 'React', 'GSAP', 'WebGL', 'Node.js'].map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div ref={ctaRef} className={styles.cta}>
          <button
            className={styles.ctaBtn}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            <span>View Work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={styles.ctaSecondary}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Talk
          </button>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
