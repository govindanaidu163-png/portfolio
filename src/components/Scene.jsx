import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'

function MainSphere({ mouseRef }) {
  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15

    if (mouseRef?.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x, mouseRef.current.x * 0.6, 0.05
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y, mouseRef.current.y * 0.4, 0.05
      )
    }

    if (materialRef.current) {
      materialRef.current.distort = 0.3 + Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.8, 128, 128]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#6c63ff"
        attach="material"
        distort={0.35}
        speed={2}
        roughness={0}
        metalness={0.9}
        envMapIntensity={1}
      />
    </mesh>
  )
}

function FloatingRing({ position, rotation, color, speed, radius }) {
  const meshRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = rotation[0] + t * speed * 0.5
    meshRef.current.rotation.y = rotation[1] + t * speed * 0.3
    meshRef.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.3
  })
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, 0.04, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  )
}

function FloatingCube({ position, speed, size }) {
  const meshRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * speed
    meshRef.current.rotation.y = t * speed * 1.3
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7 + position[0]) * 0.4
  })
  return (
    <Float speed={speed} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color="#00f5d4"
          emissive="#00f5d4"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron({ position, speed, size, color }) {
  const meshRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * speed * 0.7
    meshRef.current.rotation.z = t * speed
    meshRef.current.position.x = position[0] + Math.sin(t * 0.5) * 0.2
  })
  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  )
}

function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6c63ff"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  )
}

function CameraController({ scrollY }) {
  const { camera } = useThree()
  useFrame(() => {
    const t = scrollY?.current || 0
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 - t * 0.002, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -t * 0.001, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function GridPlane() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.material.opacity = 0.08 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshStandardMaterial
        color="#6c63ff"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  )
}

export default function Scene({ mouseRef, scrollY }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <CameraController scrollY={scrollY} />

      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-4, 3, 2]} intensity={2} color="#6c63ff" distance={15} />
      <pointLight position={[4, -2, 2]} intensity={1.5} color="#00f5d4" distance={12} />
      <pointLight position={[0, 0, 4]} intensity={1} color="#ff6b6b" distance={8} />

      <Stars radius={50} depth={50} count={3000} factor={2} saturation={0} fade speed={0.5} />
      <ParticleField />
      <GridPlane />

      <MainSphere mouseRef={mouseRef} />

      <FloatingRing position={[-3.5, 0.5, -1]} rotation={[0.4, 0.2, 0]} color="#6c63ff" speed={0.4} radius={1.4} />
      <FloatingRing position={[3.5, -0.5, -1]} rotation={[0.8, 0.6, 0.3]} color="#00f5d4" speed={0.3} radius={1.1} />
      <FloatingRing position={[0, 2.5, -2]} rotation={[1.2, 0, 0.5]} color="#ff6b6b" speed={0.5} radius={0.9} />

      <FloatingCube position={[-4.5, 1.5, -0.5]} speed={0.4} size={0.4} />
      <FloatingCube position={[4.5, 2, -1]} speed={0.3} size={0.3} />
      <FloatingCube position={[-3, -2, -0.5]} speed={0.5} size={0.25} />

      <FloatingOctahedron position={[3, 1.5, 0.5]} speed={0.5} size={0.35} color="#ff6b6b" />
      <FloatingOctahedron position={[-3.5, -1.5, 0]} speed={0.4} size={0.28} color="#00f5d4" />
      <FloatingOctahedron position={[1.5, 3, -1]} speed={0.6} size={0.2} color="#6c63ff" />
    </Canvas>
  )
}
