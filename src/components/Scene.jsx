import { Canvas } from "@react-three/fiber";
import { Stats } from '@react-three/drei'

export const Scene = ({ children }) => {
    return (
        <Canvas
            orthographic
            shadows
            camera={{
                up: [0, 0, 1],
                position: [300, -300, 300],
                zoom: 3,
            }}
        >
            <ambientLight />
            {children}
            <Stats />
        </Canvas>
    );
};
