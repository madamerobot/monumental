'use client'

import React from 'react'
import { PerspectiveCamera, Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { RoboticArm } from '@/app/components/Preview/RoboticArm'

export function Scene() {

  return (
    <Canvas>
      <ambientLight color="white" intensity={2} />
      <directionalLight
        color="white"
        intensity={2}
      />
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />

      <Center>
        <RoboticArm position={[0, 0, 0]} />
      </Center>

      {/* <OrbitControls /> */}
    </Canvas >
  )
}



