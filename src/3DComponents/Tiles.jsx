function Tile({ position }) {
  const [color, setColor] = useState(colorPalette.grey)
  const [hovered, setHovered] = useState(false)
  const [hoveredTime, setHoveredTime] = useState(0)
  const [startHoverTime, setStartHoverTime] = useState(0)

  function handlePointerOver() {
    setHovered(true)
    setStartHoverTime(Date.now())
    setColor(colorPalette.pink)
  }

  function handlePointerOut() {
    setColor(colorPalette.grey)
    setHovered(false)
    setHoveredTime(0) // Reset the hover time when pointer leaves
  }

  useFrame(() => {
    if (hovered) {
      setHoveredTime(Date.now() - startHoverTime)
    }
  })

  const tileHeight = hovered ? Math.min(hoveredTime / 400 + 1, 5) : 1

  return (
    <group scale={[1, tileHeight, 1]} position={position}>
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

export function Tiles({ count = 15 }) {
  const [groupPosition, setGroupPosition] = useState([0, 0, 0])
  const cubeSize = 0.5

  useEffect(() => {
    const totalLength = count * cubeSize
    const centeredX = -totalLength / 2 + cubeSize / 2
    setGroupPosition([centeredX, -0.5, 0])
  }, [count, cubeSize])

  return (
    <>
      <group position={groupPosition}>
        {[...Array(count)].map((_, i) => {
          return <Tile key={i} position={[i * 0.5, 0, 0]} />
        })}
      </group>
    </>
  )
}
