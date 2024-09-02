import { colorPalette } from "../utils"

import {
  BoxGeometry,
  IcosahedronGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three"

/**
 * GEOMETRIE
 */
export const cubeGeometry = new BoxGeometry(1, 1, 1)
export const planeGeometry = new PlaneGeometry(10, 10)
export const icosaGeometry = new IcosahedronGeometry(0.5, 1)

// Componente base per Creare Mesh
export function MeshComponent({
  geometry,
  position,
  scale,
  rotation,
  color,
  onPointerOver,
  onPointerOut,
  onClick,
}) {
  const Standard = new MeshStandardMaterial({
    color: color,
    flatShading: geometry === icosaGeometry ? true : false,
  })
  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      scale={scale}
      rotation={rotation}
      geometry={geometry}
      material={Standard}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    />
  )
}

/**
 * Floor
 */
export function Floor({ position }) {
  return (
    <>
      <MeshComponent
        geometry={planeGeometry}
        position={position}
        scale={1}
        rotation={[-Math.PI / 2, 0, 0]}
        color={colorPalette.grey}
      />
    </>
  )
}
