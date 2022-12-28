import '@react-three/fiber';
import { CubeMaterial, materialMap } from './assets/textures';
import { useBox } from "@react-three/cannon"
import { Mesh, Object3D, BoxGeometry, InstancedMesh } from 'three';
import { Interactive, useController, useXREvent, XRInteractionEvent } from '@react-three/xr';
import useStore, { Cube } from './store';
import React, { useCallback, useLayoutEffect, useRef } from 'react';

interface Props {
    material: CubeMaterial;
    instances: Cube[];
}

const tempObject = new Object3D();

function InstancedCubes({ material, instances }: Props) {
    const ref = useRef<InstancedMesh>(null);

    console.log('rendef from instanced cubes');

    useLayoutEffect(() => {
        instances.forEach((cube, index) => {
            tempObject.position.set(...cube.pos)
            tempObject.updateMatrix()
            ref.current?.setMatrixAt(index, tempObject.matrix)
        }) 
    })

    const rightHand = useController('right');
    
    const activeMaterial = materialMap[material];

    const [addCube, removeCube] = useStore(useCallback((state) => [
        state.addCube,
        state.removeCube,
    ], []))

    const onInteractionAdd = (e: XRInteractionEvent) => {
        if(e.target.id !== rightHand?.id) {
            return;
        }

        if(e.intersection === undefined) {
            return;
        }

        if(e.intersection?.faceIndex === undefined) {
            return;
        }

        if(e.intersection?.instanceId === undefined) {
            return;
        }

        const clickedFace = Math.floor(e.intersection.faceIndex / 2)
        const [ x, y, z ] = instances[e.intersection.instanceId].pos;
        switch(clickedFace) {
            case 0: 
                addCube(x + 1, y, z);
                return;
            case 1:
                addCube(x - 1, y, z);
                return;
            case 2:
                addCube(x, y + 1, z);
                return;
            case 3:
                addCube(x, y - 1, z);
                return;
            case 4: 
                addCube(x, y, z + 1);
                return;
            case 5:
                addCube(x, y, z - 1);
                return;
        }
    }

    const onInteractionRemove = (e: XRInteractionEvent) => {
        if(e.intersection === undefined) {
            return;
        }

        if(e.target.id !== rightHand?.id) {
            return;
        }

        if(e.intersection?.instanceId === undefined) {
            return;
        }
        const [ x, y, z ] = instances[e.intersection.instanceId].pos;
        removeCube(x, y, z);
    }

    return (
        <Interactive
            onSqueeze={onInteractionAdd}
            onSelect={onInteractionRemove}
        >
            <instancedMesh
                ref={ref}
                args={[undefined, activeMaterial, instances.length]}
            >
                <boxGeometry />
            </instancedMesh>
        </Interactive>
    )
}

export default InstancedCubes;