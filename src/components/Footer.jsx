import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.line} />
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.logoDot} />
            FOLIO
          </div>
          <p className={styles.tagline}>Crafting digital worlds, one frame at a time.</p>
        </div>
        <div className={styles.center}>
          <div className={styles.marqueeWrap}>
            <div className={styles.marquee}>
              {['React', 'Three.js', 'GSAP', 'WebGL', 'Node.js', 'TypeScript', 'Creative Dev', 'React', 'Three.js', 'GSAP', 'WebGL', 'Node.js', 'TypeScript', 'Creative Dev'].map((t, i) => (
                <span key={i} className={styles.marqueeItem}>{t} <span className={styles.marqueeDot}>·</span></span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.copy}>© {year} Portfolio. All rights reserved.</p>
          <p className={styles.credit}>Designed & Built with ♥</p>
        </div>
      </div>
    </footer>
  )
}
