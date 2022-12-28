import { Cube } from "../../store";

export function generateTreeAt(x: number, z: number): Cube[] {
    const treeHeigth = 6;
    
    const trunk: Cube[] = [-1, 0, 1, 2, 3, 4, 5].map(y => ({ pos: [x, y, z], material: 'log' }));

    const firstLeavesLayer: Array<[number, number]> = [[x + 1, z], [x - 1, z], [x, z + 1], [x, z - 1], [x, z]]
    const secondLeavesLayer: Array<[number, number]>  = [
        [x + 1, z], 
        [x - 1, z], 
        [x, z + 1], 
        [x, z - 1], 
        [x + 1, z + 1], 
        [x + 1, z - 1], 
        [x - 1, z + 1], 
        [x - 1, z - 1]
    ];
    const thirdLeavesLayer: Array<[number, number]>  = [
        ...secondLeavesLayer,
        [x + 2, z], 
        [x - 2, z], 
        [x, z + 2], 
        [x, z - 2],
        [x + 1, z + 2], 
        [x - 1, z + 2], 
        [x + 1, z - 2], 
        [x - 1, z - 2],
        [x + 2, z + 1], 
        [x + 2, z - 1], 
        [x - 2, z + 1], 
        [x - 2, z - 1], 
    ]
    const fourthLeavesLayer: Array<[number, number]>  = [
        ...thirdLeavesLayer, 
        [x + 2, z + 2], 
        [x + 2, z - 2], 
        [x - 2, z + 2], 
        [x - 2, z - 2]
    ];

    function getLayerBLocks(coords: Array<[number, number]>, offset: number): Cube[] {
        return coords.map(([x, z]) => ({ pos: [x, treeHeigth - offset, z], material: 'leaves' }))
    }

    const firstLayerBlocks = getLayerBLocks(firstLeavesLayer, 0);
    const secondLayerBlocks = getLayerBLocks(secondLeavesLayer, 1);
    const thirdLayerBlocks = getLayerBLocks(thirdLeavesLayer, 2);
    const fourthLayerBlocks = getLayerBLocks(fourthLeavesLayer, 3);

    return [
        ...trunk,
        ...firstLayerBlocks,
        ...secondLayerBlocks,
        ...thirdLayerBlocks,
        ...fourthLayerBlocks,
    ];  
}

function getDistanceBetweenPoints(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

export function generateRandomPoints(
    numberOfPoints: number,
    minDistanceBetween: number,
    initialPoint: [number, number],
    minCoordinate: number,
    maxCoordinate: number
  ): [number, number][] {
    const points: [number, number][] = [initialPoint];
  
    while (points.length < numberOfPoints) {
      const newPoint: [number, number] = [
        minCoordinate + (maxCoordinate - minCoordinate) * Math.random(),
        minCoordinate + (maxCoordinate - minCoordinate) * Math.random()
      ];
  
      let isTooClose = false;
      for (const point of points) {
        if (getDistanceBetweenPoints(point, newPoint) < minDistanceBetween) {
          isTooClose = true;
          break;
        }
      }
  
      if (!isTooClose) {
        points.push(newPoint);
      }
    }
  
    return points;
  }