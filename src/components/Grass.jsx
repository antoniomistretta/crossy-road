import { tileSize, tilesPerRow } from "../constants";

export function Grass({ rowIndex, children }) {
    return (
        <group position-y={rowIndex * tileSize}>
            <mesh name="grass" receiveShadow>
                <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
                <meshStandardMaterial color={0xbaf455} flatShading />
            </mesh>
            {children}
        </group>
    );
}
