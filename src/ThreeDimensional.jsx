import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { SoftShadows } from "@react-three/drei"
import { useControls, Leva } from "leva"
import * as THREE from "three"

// import { Perf } from "r3f-perf"

const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

function Sphere({ position = [0, 0, 0], ...props }) {
  const [isSphere, setisSphere] = useState(true)
  const [materialColor, setMaterialColor] = useState("#bd93f9")
  const ref = useRef()
  const factor = useMemo(() => 0.5 + Math.random(), [])

  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
  const geometry = isSphere ? sphereGeometry : boxGeometry

  //Determina se generare una sfera o un
  useEffect(() => {
    setisSphere(Math.random() > 0.5)
  }, [])

  useFrame(state => {
    const t = easeInOutCubic(
      (1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2
    )
    ref.current.position.y = position[1] + t * 4
    ref.current.scale.y = 1 + t * 3
  })

  function onHover() {
    isSphere ? setMaterialColor("#ff79c6") : setMaterialColor("#50fa7b")
  }

  function onHoverOut() {
    setMaterialColor("#bd93f9")
  }

  return (
    <>
      <mesh
        ref={ref}
        position={position}
        {...props}
        castShadow
        receiveShadow
        onPointerEnter={onHover}
        onPointerLeave={onHoverOut}
        geometry={geometry}
      >
        <meshToonMaterial color={materialColor} roughness={0} metalness={0.1} />
      </mesh>
    </>
  )
}

function Spheres({ number = 20, space = 12 }) {
  const ref = useRef()
  const positions = useMemo(
    () =>
      [...new Array(number)].map(() => [
        3 - Math.random() * space,
        Math.random() * 4,
        3 - Math.random() * space,
      ]),
    []
  )
  useFrame(
    state =>
      (ref.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.2 * 1) * Math.PI)
  )
  return (
    <group ref={ref}>
      {positions.map((pos, index) => (
        <Sphere key={index} position={pos} />
      ))}
    </group>
  )
}

export default function ThreeDimensional() {
  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  })
  return (
    <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
      <Leva hidden />
      <SoftShadows {...config} />
      <fog attach="fog" args={["white", 0, 40]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize={1024}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />
      <group position={[0, -3.5, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[4, 1, 1]} />
          <meshStandardMaterial color="#50fa7b" />
        </mesh>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial color="#50fa7b" />
        </mesh>
        <Spheres />
      </group>
      {/*<Perf position="top-left" />*/}
    </Canvas>
  )
}
