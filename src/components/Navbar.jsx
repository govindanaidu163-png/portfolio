import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Navbar.module.css'

const links = ['hero', 'about', 'projects', 'skills', 'contact']

export default function Navbar() {
  const navRef = useRef(null)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 2.8 }
    )

    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = links.map(id => document.getElementById(id))
      const scrollY = window.scrollY + window.innerHeight / 3
      sections.forEach((sec, i) => {
        if (!sec) return
        if (scrollY >= sec.offsetTop) setActive(links[i])
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => scrollTo('hero')}>
        <span className={styles.logoDot} />
        <span>FOLIO</span>
      </div>
      <ul className={styles.links}>
        {links.map(link => (
          <li key={link}>
            <button
              className={`${styles.link} ${active === link ? styles.active : ''}`}
              onClick={() => scrollTo(link)}
            >
              {link}
              <span className={styles.linkLine} />
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.status}>
        <span className={styles.statusDot} />
        Available
      </div>
    </nav>
  )
}
