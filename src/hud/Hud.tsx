import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import useStore from '../store';
import { CubeMaterial, materialMap, textureMap }  from '../assets/textures';
import { BoxBufferGeometryProps, MeshProps, useFrame, useThree } from '@react-three/fiber';
import { useXR, useXREvent } from '@react-three/xr';
import { Group } from 'three';

interface MaterialProps {
    args: any,
    //color: string,
    material: CubeMaterial,
    isActive: boolean,
    meshProps?: MeshProps
}

const allMaterials = Object.keys(materialMap).filter(material => material !== 'ground') as CubeMaterial[];

const Material = ({ args, material, isActive, meshProps }: MaterialProps) => {
  return (
    <mesh>
    <mesh {...meshProps}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial map={textureMap[material]} color={isActive ? '#ff0000' : '#ffffff'} />
    </mesh>
    <meshStandardMaterial
        attach="material"
        color={isActive ? '#ff5f19' : '#222'}
      />
    </mesh>
  );
};

interface MaterialContainerProps {
    args: [number, number, number],
    color: string,
    activeMaterial: CubeMaterial,
    meshProps?: MeshProps
}

const MaterialContainer = ({ args, color, activeMaterial, meshProps }: MaterialContainerProps) => {

    return (
    <mesh {...meshProps}>
      {allMaterials.map((key, index) => {
        return (
          <Material
            key={key}
            isActive={key === activeMaterial}
            material={key as CubeMaterial}
            args={[0.2, 0.2, 0.05] as [number, number, number]}
            meshProps={{
                position: [-0.65 + index / 4, 0, 0.01]
            }}
          />
        );
      })}
      <boxBufferGeometry attach="geometry" args={args} />

      <meshStandardMaterial
        attach="material"
        color={color}
        transparent={true}
      />
    </mesh>
  );
};

export const Hud = () => {
  const position: [number, number, number] = [0, -1, -3];

  const { gl, camera } = useThree();

  const ref = useRef<Group>(null);
    
  const [activeMaterial, setMaterial] = useStore((state) => [state.material, state.setMaterial]);

  useXREvent('squeeze', (e) => {
    const currentTextureIndex = allMaterials.indexOf(activeMaterial);
    setMaterial(allMaterials[(currentTextureIndex + 1) % allMaterials.length])
  }, { handedness: 'left' })

  useLayoutEffect(() => {
    const cam = gl.xr.isPresenting ? gl.xr.getCamera() : camera
    console.log('hud effect runnin');
    if(!ref.current) return () => {};
    const hud = ref.current
    cam.add(hud);
    return () => cam.remove(hud);
  }, [ref.current])

  return (
    <group ref={ref}>
        <group position={position}>
          <MaterialContainer
            args={[1.7, 0.3, 0.01] as [number, number, number]}
            color="#222"
            activeMaterial={activeMaterial}
          />
        </group>
    </group>
  );
};
