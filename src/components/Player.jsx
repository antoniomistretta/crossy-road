import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import usePlayerAnimation from "../hooks/usePlayerAnimation";
import { setPlayerRef } from "../stores/player";

export function Player() {
    const player = useRef(null);
    const light = useRef(null);
    const camera = useThree((state) => state.camera);

    useEffect(() => {
        if (!player) return;
        if (!light) return;

        setPlayerRef(player.current);
        
        player.current.add(camera);
        light.current.target = player.current;
    });

    usePlayerAnimation(player);

    return (
        <group name="playerContainer" ref={player}>
            <group name="playerMesh">
                <mesh
                    name="body"
                    position={[0, 0, 10]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[15, 15, 20]} />
                    <meshLambertMaterial color={0xffffff} flatShading />
                </mesh>
                <mesh
                    name="head"
                    position={[0, 0, 21]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[2, 4, 2]} />
                    <meshLambertMaterial color={0xf0619a} flatShading />
                </mesh>
                <mesh
                    name="beak"
                    position={[0, 8, 14]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[5, 4, 2]} />
                    <meshLambertMaterial color={0xffcc00} flatShading />
                </mesh>
            </group>

            <directionalLight
                ref={light}
                up={[0, 0, 1]}
                position={[-100, -100, 200]}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-500}
                shadow-camera-right={500}
                shadow-camera-top={500}
                shadow-camera-bottom={-500}
                shadow-camera-near={0}
                shadow-camera-far={1000}
            />
        </group>
    );
}
