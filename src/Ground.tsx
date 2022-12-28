
import { usePlane } from "@react-three/cannon"
import { Interactive, useController } from "@react-three/xr";
import React from "react"
import { Mesh } from "three";
import { materialMap } from "./assets/textures"
import useStore from "./store";

const Ground = () => {
    const [addCube] = useStore((state) => [state.addCube])

    const [ref] = usePlane<Mesh>(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
    }))

    const rightHand = useController('right');

    return (
        <Interactive
        onSqueeze={(e) => {
            console.log('adding cube in vr');

            if(e.target.id !== rightHand?.id) {
                return;
            }

            if(!e.intersection?.point) {
                console.log('there is no intersection with the ground');
                return;
            }
            const [x, y, z] = Object.values(e.intersection.point).map((val) => Math.ceil(val))
            addCube(x, y, z);
        }}
        >
            <mesh
                onClick={(e) => {
                    e.stopPropagation()
                    const [x, y, z] = Object.values(e.point).map((val) =>
                        Math.ceil(val)
                    )
                    addCube(x, y, z)
                }}
                ref={ref}
                material={materialMap.ground}
            >
                <planeBufferGeometry attach="geometry" args={[100, 100]} />
            </mesh>
        </Interactive>
    )
}

export default React.memo(Ground);