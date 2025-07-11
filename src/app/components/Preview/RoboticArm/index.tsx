'use client'

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useRobotState } from '../../../context/RobotStateContext'
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
  const { nodes, materials } = useGLTF('/models/robotic_arm-transformed.glb') as unknown as GLTFResult
  const { robotState } = useRobotState()

  // Helper function to convert degrees to radians
  const toRadians = (degrees: number) => degrees * (Math.PI / 180)

  // We need to invert the angle coming from our motionTrajectory calcs, to match
  // with the coordinate system of the 3D space & y-axis rotation
  const baseRotation = robotState.base * -1; // degrees
  const elbowRotation = robotState.elbow * -1; // degrees
  const wristRotation = robotState.wrist * -1; // degrees
  const shoulderRotation = -90; // degrees, hardcode for now

  return (
    <group ref={group} rotation={[0, toRadians(baseRotation), 0]} position={[position[0], position[1], position[2]]} dispose={null} >
      <group name="Object_5" rotation={[toRadians(-90), 0, toRadians(0)]}>
        <group name="Bone006_07" position={[0, 4.562, 5.244]} />
      </group>
      < group name="Bone_00" >
        <group name="Bone001_01" position={[0, 0.864, 0]}>
          <group name="Bone002_02" position={[0, 2.872, 0]}>
            <group name="Bone003_03" position={[0, 3.064, 0]} rotation={[toRadians(-90), 0, toRadians(elbowRotation)]}>
              <group name="Bone004_04" position={[0, 4.2, 0]} rotation={[toRadians(-77), 0, toRadians(wristRotation)]}>
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
              {/* <group name="Bone007_05" position={[0, 3.334, -0.73]} rotation={[toRadians(-149), 0.017, 0]}>
                <group name="Cylinder019" rotation={[toRadians(149), 0.017, 0.005]}>
                  <mesh name="Cylinder019_Material_0" geometry={nodes.Cylinder019_Material_0.geometry} material={materials.Material} />
                </group>
              </group> */}
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
            {/* <group name="Bone005_06" position={[0, 0.864, -0.9]} rotation={[toRadians(-59), -0.001, 0]}>
              <group name="Cylinder016" position={[0, 0.005, -0.004]} rotation={[toRadians(-32), -0.001, 0.004]}>
                <mesh name="Cylinder016_Material_0" geometry={nodes.Cylinder016_Material_0.geometry} material={materials.Material} />
              </group>
            </group> */}
            <group name="Cylinder013" position={[0, -0.036, 0]} rotation={[toRadians(shoulderRotation), 0, 0]}>
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
      < mesh name="Cylinder010_Material_0" geometry={nodes.Cylinder010_Material_0.geometry} material={materials.Material} position={[0, 0.5, 0]} rotation={[toRadians(-90), 0, 0]} />
      {/* <-- end base --> */}
    </group >
  )
}

useGLTF.preload('/models/robotic_arm-transformed.glb')
