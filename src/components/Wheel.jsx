export function Wheel({ x }) {
    return (
        <mesh name="wheel" position={[x, 0, 6]}>
            <boxGeometry args={[12, 32, 12]} />
            <meshLambertMaterial color="black" flatShading />
        </mesh>
    );
}
