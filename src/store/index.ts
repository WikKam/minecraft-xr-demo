import create from "zustand";
import { CubeMaterial } from "../assets/textures";
import { generateRandomPoints, generateTreeAt } from "../terrain/trees/generate";

export interface Cube {
    pos: [number, number, number];
    material: CubeMaterial,
}

interface Store {
    material: CubeMaterial,
    cubes: Array<Cube>
    addCube(x: number, y: number, z: number): void;
    removeCube(x: number, y: number, z: number): void;
    setMaterial(material: CubeMaterial): void;
}

const useStore = create<Store>((set) => ({
    material: "dirt",
    cubes: generateRandomPoints(50, 10, [5, 5], -50, 50).flatMap(([x, y]) => generateTreeAt(x, y)),
    addCube: (x: number, y: number, z: number) => {
        set((prev) => {       
            if(prev.cubes.some(prevCube => {
                const [X, Y, Z] = prevCube.pos
                return X == x && Y == y && Z == z
            })) {
                console.log('cube already exists at this position')
                return prev;
            }
            return { 
                cubes: [
                    ...prev.cubes,
                    { pos: [x, y, z], material: prev.material },
                ],
            }
        })
    },
    removeCube: (x: number, y: number, z: number) => {
        set((prev) => ({
            cubes: prev.cubes.filter((cube) => {
                const [X, Y, Z] = cube.pos
                return X != x || Y != y || Z != z
            }),
        }))
    },
    setMaterial: (material: CubeMaterial) => {
        set(() => ({
            material
        }))
    },
}));

export default useStore;