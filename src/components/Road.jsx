import { tileSize, tilesPerRow } from "../constants";

export function Road({ rowIndex, children }) {
    return (
        <group position-y={rowIndex * tileSize}>
            <mesh name="road" receiveShadow>
                <planeGeometry args={[tilesPerRow * tileSize, tileSize]} />
                <meshLambertMaterial color={0x454a59} flatShading />
            </mesh>
            {children}
        </group>
    );
}
