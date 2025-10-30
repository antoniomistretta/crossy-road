import { tileSize } from "../constants";

export function Tree({ tileIndex, height }) {
    return (
        <group name="tree" position-x={tileIndex * tileSize}>
            <mesh
                name="leaves"
                position-z={height / 2 + 30}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[30, 30, height]} />
                <meshLambertMaterial color={0x7aa21d} flatShading />
            </mesh>
            <mesh name="trunk" position-z={10} castShadow receiveShadow>
                <boxGeometry args={[15, 15, 30]} />
                <meshLambertMaterial color={0x654321} flatShading />
            </mesh>
        </group>
    );
}
