import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Loader.module.css'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const counterRef = useRef(null)
  const barRef = useRef(null)
  const overlayRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    let count = { val: 0 }

    tl.to(count, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(count.val).toString().padStart(3, '0')
        }
        if (barRef.current) {
          barRef.current.style.width = count.val + '%'
        }
      }
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in'
    }, '-=0.3')
    .to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.9,
      ease: 'expo.inOut',
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none'
        }
        onComplete()
      }
    }, '-=0.1')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={loaderRef} className={styles.loader}>
      <div ref={overlayRef} className={styles.overlay}>
        <div ref={textRef} className={styles.content}>
          <div className={styles.logo}>PORTFOLIO</div>
          <div className={styles.bottom}>
            <div className={styles.counter} ref={counterRef}>000</div>
            <div className={styles.barWrap}>
              <div className={styles.barTrack}>
                <div className={styles.bar} ref={barRef} />
              </div>
              <span className={styles.label}>Loading experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
