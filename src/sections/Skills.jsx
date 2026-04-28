import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    category: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'Three.js / WebGL', level: 90 },
      { name: 'GSAP Animation', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'CSS / Framer Motion', level: 93 },
    ]
  },
  {
    category: 'Backend',
    icon: '◉',
    skills: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'Python / FastAPI', level: 80 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'Redis / Caching', level: 75 },
      { name: 'GraphQL', level: 82 },
    ]
  },
  {
    category: 'Creative',
    icon: '◎',
    skills: [
      { name: 'GLSL Shaders', level: 78 },
      { name: 'Blender 3D', level: 70 },
      { name: 'Figma / Design', level: 88 },
      { name: 'Motion Design', level: 85 },
      { name: 'Creative Direction', level: 90 },
    ]
  },
]

const tools = [
  'React', 'Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Node.js', 'Python',
  'WebGL', 'GLSL', 'Figma', 'Blender', 'PostgreSQL', 'Redis', 'Docker',
  'AWS', 'Vercel', 'Git', 'GraphQL', 'Framer Motion', 'Tailwind'
]

function SkillBar({ name, level, index }) {
  const barRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(fillRef.current,
      { width: 0 },
      {
        width: level + '%',
        duration: 1.4,
        ease: 'expo.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 90%',
        }
      }
    )
    gsap.fromTo(barRef.current,
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 90%',
        }
      }
    )
  }, [level, index])

  return (
    <div ref={barRef} className={styles.skillItem}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <div ref={fillRef} className={styles.barFill} style={{ width: 0 }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const toolsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo(Array.from(toolsRef.current?.children || []),
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.6, ease: 'expo.out', stagger: 0.04,
          scrollTrigger: { trigger: toolsRef.current, start: 'top 85%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className={styles.skills}>
      <div className={styles.bgGrid} />
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>Expertise</span>
          </div>
          <h2 className={styles.heading}>
            Skills &amp; <span className={styles.accent}>Technologies</span>
          </h2>
          <p className={styles.sub}>
            A deep toolkit built over years of shipping production-grade applications and creative experiments.
          </p>
        </div>

        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.category} className={styles.group}>
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon}>{group.icon}</span>
                <h3 className={styles.groupTitle}>{group.category}</h3>
              </div>
              <div className={styles.groupSkills}>
                {group.skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.toolsSection}>
          <div className={styles.toolsLabel}>Full stack of tools</div>
          <div ref={toolsRef} className={styles.tools}>
            {tools.map(tool => (
              <span key={tool} className={styles.tool}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
