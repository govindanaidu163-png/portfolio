import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Cursor.module.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power3.out'
      })
    }

    const ticker = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      gsap.set(ring, { x: ringX, y: ringY })
    }

    const onMouseEnterLink = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.3, duration: 0.3, ease: 'power2.out' })
    }
    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMouseMove)
    gsap.ticker.add(ticker)

    const addLinkListeners = () => {
      const links = document.querySelectorAll('a, button, [data-cursor]')
      links.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    const observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    addLinkListeners()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(ticker)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
