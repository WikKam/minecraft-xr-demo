import { Color, MeshStandardMaterial, TextureLoader } from "three"
import { NearestFilter, RepeatWrapping } from "three"

import dirtImg from "./dirt.jpg"
import grassImg from "./grass.jpg"
import glassImg from "./glass.png"
import logImg from "./log.jpg"
import woodImg from "./wood.png"
import leavesImg from "./leaves.png";

const loader = new TextureLoader();

const loadTexture = (img: string) => {
    const texture = loader.load(img)
    texture.magFilter = NearestFilter
    return texture;
}

export const textureMap = {
    dirt: loadTexture(dirtImg),
    glass: loadTexture(grassImg),
    grass: loadTexture(glassImg),
    wood: loadTexture(woodImg),
    log: loadTexture(logImg),
    ground: loadTexture(grassImg),
    leaves: loadTexture(leavesImg),
} as const

textureMap.ground.wrapS = RepeatWrapping
textureMap.ground.wrapT = RepeatWrapping
textureMap.ground.repeat.set(100, 100)

export const imagesMap = {
    dirt: dirtImg,
    glass: grassImg,
    grass: glassImg,
    wood: woodImg,
    log: logImg,
    ground: grassImg,
    leaves: leavesImg,
} as const

export const materialMap = {
    dirt: new MeshStandardMaterial({ map: textureMap.dirt }),
    glass: new MeshStandardMaterial({ map: textureMap.glass, transparent: true }),
    grass: new MeshStandardMaterial({ map: textureMap.grass }),
    wood: new MeshStandardMaterial({ map: textureMap.wood }),
    log: new MeshStandardMaterial({ map: textureMap.log }),
    ground: new MeshStandardMaterial({ map: textureMap.ground }),
    leaves: new MeshStandardMaterial({ map: textureMap.leaves, color: new Color(0x3A5F0B), transparent: true }),
} as const

export type CubeMaterial = keyof typeof materialMap;
