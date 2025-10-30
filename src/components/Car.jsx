import { Wheel } from "./Wheel";

export function Car({ color }) {
    return (
        <group name="car">
            <mesh name="body" position={[0, 0, 12]} castShadow receiveShadow>
                <boxGeometry args={[60, 30, 14]} />
                <meshLambertMaterial color={color} flatShading />
            </mesh>
            <mesh name="cabin" position={[-6, 0, 24]} castShadow receiveShadow>
                <boxGeometry args={[32, 24, 12]} />
                <meshLambertMaterial color={0xffffff} flatShading />
            </mesh>
            <Wheel x={-18} />
            <Wheel x={18} />
        </group>
    );
}
