import { useFrame } from "@react-three/fiber"
import { PerspectiveCamera, SoftShadows } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { colorPalette } from "./utils"
import {
  MeshComponent,
  cubeGeometry,
  icosaGeometry,
} from "./3DComponents/3Dutils"
import { Perf } from "r3f-perf"

export default function Experience() {
  const cameraRef = useRef()
  const [cameraPosition, setCameraPosition] = useState([0, 5, 0])

  useEffect(() => {
    const handleMouseMove = event => {
      const { clientX, clientY } = event
      const x = (clientX / window.innerWidth + 0.5) * 5
      const y = (clientY / window.innerHeight + 0.5) * 5
      if (cameraRef.current) {
        cameraRef.current.position.set(x, 5, -y)
        cameraRef.current.lookAt(0, 0, 0)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* <Perf position="bottom-left" /> */}
      <PerspectiveCamera ref={cameraRef} makeDefault />
      <directionalLight position={[1, 3, 2]} intensity={1} castShadow />
      <ambientLight intensity={0.2} />

      <Tiles />
    </>
  )
}

function Tiles({ count = 16 }) {
  const ref = useRef()
  const [groupPosition, setGroupPosition] = useState([0, 0, 0])
  const cubeSize = 0.5
  const gridSize = Math.sqrt(count)
  const tilesRef = useRef([])

  useEffect(() => {
    const totalLength = gridSize * cubeSize
    const centeredXZ = -totalLength / 2 + cubeSize / 2
    setGroupPosition([centeredXZ, -0.5, centeredXZ])
  }, [gridSize, cubeSize])

  function getAdjacentIndices(index) {
    const rowIndex = Math.floor(index / gridSize)
    const colIndex = index % gridSize
    const adjacentIndices = []

    if (rowIndex > 0) adjacentIndices.push(index - gridSize) // top
    if (rowIndex < gridSize - 1) adjacentIndices.push(index + gridSize) // bottom
    if (colIndex > 0) adjacentIndices.push(index - 1) // left
    if (colIndex < gridSize - 1) adjacentIndices.push(index + 1) // right

    return adjacentIndices
  }

  function Tile({ position, index }) {
    const ref = useRef()
    const [color, setColor] = useState(colorPalette.grey)
    const [hovered, setHovered] = useState(false)
    const [hoveredTime, setHoveredTime] = useState(0)
    const [startHoverTime, setStartHoverTime] = useState(0)

    function handlePointerOver() {
      setHovered(true)
      setStartHoverTime(Date.now())
      setColor(colorPalette.pink)

      const adjacentIndices = getAdjacentIndices(index)
      adjacentIndices.forEach(adjIndex => {
        if (tilesRef.current[adjIndex]) {
          tilesRef.current[adjIndex].setColor(colorPalette.green)
          tilesRef.current[adjIndex].setHeight(tileHeight * 0.5)
        }
      })

      return ref.current.position
    }

    function handlePointerOut() {
      setColor(colorPalette.grey)
      setHovered(false)
      setHoveredTime(0)

      const adjacentIndices = getAdjacentIndices(index)
      adjacentIndices.forEach(adjIndex => {
        if (tilesRef.current[adjIndex]) {
          tilesRef.current[adjIndex].setColor(colorPalette.grey)
          tilesRef.current[adjIndex].setHeight(1)
        }
      })

      return
    }

    useFrame(() => {
      if (hovered) {
        setHoveredTime(Date.now() - startHoverTime)
      }
    })

    const tileHeight = hovered ? Math.min(hoveredTime / 400 + 1, 5) : 1

    useEffect(() => {
      tilesRef.current[index] = {
        setColor,
        setHeight: height => (ref.current.scale.y = height),
      }
    }, [index])

    return (
      <group
        ref={ref}
        scale={[1, tileHeight, 1]}
        position={position}
        onClick={() => console.log(ref.current.position)}
      >
        <MeshComponent
          geometry={cubeGeometry}
          scale={0.49}
          position={[0, 0.25, 0]}
          color={color}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </group>
    )
  }

  return (
    <group ref={ref} position={groupPosition}>
      {Array.from({ length: count }).map((_, index) => {
        const rowIndex = Math.floor(index / gridSize)
        const colIndex = index % gridSize
        const x = colIndex * cubeSize
        const z = rowIndex * cubeSize

        return <Tile key={index} index={index} position={[x, 0, z]} />
      })}
    </group>
  )
}
