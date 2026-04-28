import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    title: 'Nebula OS',
    category: 'Web Application',
    description: 'A futuristic operating system UI built entirely in the browser using WebGL, React, and custom shader effects.',
    tech: ['Three.js', 'React', 'GLSL', 'WebSockets'],
    accent: '#6c63ff',
    size: 'large'
  },
  {
    id: '02',
    title: 'Void Commerce',
    category: 'E-Commerce',
    description: 'Next-gen luxury e-commerce experience with particle-based product reveals and 3D model integration.',
    tech: ['Next.js', 'Shopify', 'Three.js', 'GSAP'],
    accent: '#00f5d4',
    size: 'small'
  },
  {
    id: '03',
    title: 'Neural Viz',
    category: 'Data Visualization',
    description: 'Real-time neural network visualization tool showing training processes through animated 3D graphs.',
    tech: ['D3.js', 'WebGL', 'Python', 'WebSockets'],
    accent: '#ff6b6b',
    size: 'small'
  },
  {
    id: '04',
    title: 'Prism Studio',
    category: 'Creative Platform',
    description: 'A collaborative 3D design environment running in-browser with multiplayer capabilities and custom rendering pipeline.',
    tech: ['Three.js', 'CRDT', 'Node.js', 'Redis'],
    accent: '#ffd93d',
    size: 'large'
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 30
      const rotateY = -(x - centerX) / 30

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800
      })

      const gX = (x / rect.width) * 100
      const gY = (y / rect.height) * 100
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${gX}% ${gY}%, ${project.accent}18, transparent 60%)`
      }
    }

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      if (glow) glow.style.background = 'transparent'
    }

    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseleave', onMouseLeave)

    gsap.fromTo(card,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'expo.out',
        delay: index * 0.1,
        scrollTrigger: { trigger: card, start: 'top 85%' }
      }
    )

    return () => {
      card.removeEventListener('mousemove', onMouseMove)
      card.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [project.accent, index])

  return (
    <div ref={cardRef} className={`${styles.card} ${styles[project.size]}`} style={{ '--accent': project.accent }}>
      <div ref={glowRef} className={styles.cardGlow} />
      <div className={styles.cardTop}>
        <span className={styles.cardId}>{project.id}</span>
        <span className={styles.cardCategory}>{project.category}</span>
        <a className={styles.cardArrow} href="#" aria-label="View project">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 15L15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <div className={styles.cardVisual}>
        <div className={styles.visualContent}>
          <div className={styles.visualDot} style={{ background: project.accent, boxShadow: `0 0 20px ${project.accent}` }} />
          <div className={styles.visualLines}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.visualLine} style={{ '--delay': `${i * 0.15}s`, '--accent': project.accent }} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cardBottom}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTech}>
          {project.tech.map(t => (
            <span key={t} className={styles.techTag} style={{ '--accent': project.accent }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>Selected Work</span>
          </div>
          <h2 className={styles.heading}>
            Projects that<br />
            <span className={styles.accent}>define the craft</span>
          </h2>
          <p className={styles.sub}>
            A curated selection of projects that showcase the intersection of technical excellence and creative vision.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
