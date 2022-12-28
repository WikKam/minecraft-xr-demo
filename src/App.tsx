import './App.css'
import '@react-three/fiber'; 
import { Canvas } from '@react-three/fiber'
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon"
import Ground from './Ground';
import Cubes from './Cubes';
import { Hud } from './hud/Hud';

function App() {

  return (
    <>
    <VRButton />
      <Canvas>
        <XR>
          <Sky sunPosition={[100, 100, 10]} />
          <ambientLight intensity={0.5} />
          <Physics>
            <Controllers />
            <Hands />
            <Cubes />
            <Ground />
          </Physics>
          <Hud />
        </XR>
      </Canvas>
    </>
  )
}

export default App
