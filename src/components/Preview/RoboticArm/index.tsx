'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useRobotState } from '../../../app/context/RobotStateContext'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    [key: string]: THREE.Material
  }
}

interface RoboticArmProps {
  position: [number, number, number]
}

export function RoboticArm({ position }: RoboticArmProps) {

  const group = React.useRef(null)
  const { nodes, materials, animations } = useGLTF('/models/robotic_arm-transformed.glb') as unknown as GLTFResult
  // const { actions } = useAnimations(animations, group)
  const { robotState } = useRobotState()

  // Helper function to convert degrees to radians
  const toRadians = (degrees: number) => degrees * (Math.PI / 180)

  // Hardcoded values for now
  const baseRotation = robotState.base; // degrees
  const elbowRotation = robotState.elbow; // degrees
  const wristRotation = robotState.wrist; // degrees
  const shoulderRotation = -90; // degrees, hardcode for now

  // Create different colored materials for each joint
  const redMaterial = new THREE.MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.5 })
  const blueMaterial = new THREE.MeshStandardMaterial({ color: 'blue', transparent: true, opacity: 0.5 })
  const greenMaterial = new THREE.MeshStandardMaterial({ color: 'green', transparent: true, opacity: 0.5 })
  const yellowMaterial = new THREE.MeshStandardMaterial({ color: 'yellow', transparent: true, opacity: 0.5 })

  return (
    <group ref={group} rotation={[0, toRadians(baseRotation), 0]} position={[position[0], position[1], position[2]]} dispose={null} >
      <group name="Object_5" rotation={[toRadians(-90), 0, toRadians(0)]}>
        <group name="Bone006_07" position={[0, 4.562, 5.244]} />
      </group>
      < group name="Crane" >
        <group name="Bone001_01" position={[0, 0.864, 0]}>
          <mesh material={blueMaterial} geometry={nodes.Cylinder011_Material_0.geometry} />
          <group name="Bone002_02" position={[0, 2.872, 0]}>

            <group name="Bone003_03" position={[0, 3.064, 0]} rotation={[toRadians(-90), 0, toRadians(elbowRotation)]}>
              <group name="Bone004_04" position={[0, 4.2, 0]} rotation={[toRadians(-77), 0, toRadians(wristRotation)]}>
                <mesh material={yellowMaterial} geometry={nodes.Cylinder015_Material_0.geometry} />
                <group name="Cylinder015">
                  <mesh name="Cylinder015_Material_0" geometry={nodes.Cylinder015_Material_0.geometry} material={materials.Material} />
                </group>
                <group name="Cylinder020" position={[0, 1.487, 0]}>
                  <mesh name="Cylinder020_Material_0" geometry={nodes.Cylinder020_Material_0.geometry} material={materials.Material} />
                </group>
                <group name="Cylinder021" position={[0, 1.487, 0]}>
                  <mesh name="Cylinder021_Material_0" geometry={nodes.Cylinder021_Material_0.geometry} material={materials.Material} />
                </group>
              </group>
              <group name="Bone007_05" position={[0, 3.334, -0.73]} rotation={[toRadians(-149), 0.017, 0]}>
                <group name="Cylinder019" rotation={[toRadians(149), 0.017, 0.005]}>
                  <mesh name="Cylinder019_Material_0" geometry={nodes.Cylinder019_Material_0.geometry} material={materials.Material} />
                </group>
              </group>
              <group name="Cylinder014">
                <mesh name="Cylinder014_Material_0" geometry={nodes.Cylinder014_Material_0.geometry} material={materials.Material} />
              </group>
              <group name="Cylinder018" position={[0, 3.334, -0.73]}>
                <mesh name="Cylinder018_Material_0" geometry={nodes.Cylinder018_Material_0.geometry} material={materials.Material} />
              </group>
              <group name="Cylinder004_Plate001">
                <mesh name="Cylinder004_Plate001_Material_0" geometry={nodes.Cylinder004_Plate001_Material_0.geometry} material={materials.Material} />
              </group>
            </group>
            <group name="Bone005_06" position={[0, 0.864, -0.9]} rotation={[toRadians(-59), -0.001, 0]}>
              <group name="Cylinder016" position={[0, 0.005, -0.004]} rotation={[toRadians(-32), -0.001, 0.004]}>
                <mesh name="Cylinder016_Material_0" geometry={nodes.Cylinder016_Material_0.geometry} material={materials.Material} />
              </group>
            </group>
            <group name="Cylinder013" position={[0, -0.036, 0]} rotation={[toRadians(shoulderRotation), 0, 0]}>
              <mesh material={greenMaterial} geometry={nodes.Cylinder013_Material_0.geometry} />
              <mesh name="Cylinder013_Material_0" geometry={nodes.Cylinder013_Material_0.geometry} material={materials.Material} />
            </group>
            <group name="Cylinder017" position={[0, 0.863, -0.906]} rotation={[toRadians(-90), 0, 0]}>
              <mesh name="Cylinder017_Material_0" geometry={nodes.Cylinder017_Material_0.geometry} material={materials.Material} />
            </group>
          </group>
          <group name="Cylinder011" position={[0, 0.225, 0]} rotation={[toRadians(-90), 0, 0]}>
            <mesh name="Cylinder011_Material_0" geometry={nodes.Cylinder011_Material_0.geometry} material={materials.Material} />
          </group>
          <group name="Cylinder012" position={[0, 2.872, 0]} rotation={[toRadians(-90), 0, 0]}>
            <mesh name="Cylinder012_Material_0" geometry={nodes.Cylinder012_Material_0.geometry} material={materials.Material} />
          </group>
        </group>
      </group >
      {/* <-- base --> */}
      < mesh name="Base" geometry={nodes.Cylinder010_Material_0.geometry} material={materials.Material} position={[0, 0.5, 0]} rotation={[toRadians(-90), 0, 0]} />
      {/* <-- end base --> */}
    </group >
  )
}

useGLTF.preload('/models/robotic_arm-transformed.glb')
