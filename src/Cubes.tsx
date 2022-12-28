import useStore from "./store";
import { useCallback } from "react";
import { CubeMaterial, materialMap } from "./assets/textures";
import InstancedCubes from "./InstancedCubes";
const Cubes = () => {
    const cubes = useStore(useCallback((state) => state.cubes, []));
    return (
        <>
        {Object.keys(materialMap).map((key) => {
            const matchingCubes = cubes.filter(cube => cube.material === key);
            return <InstancedCubes key={matchingCubes.length + key} material={key as CubeMaterial} instances={matchingCubes} />
        })}
        </>
    )
}

export default Cubes