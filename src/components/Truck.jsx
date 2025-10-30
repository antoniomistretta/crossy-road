import { Wheel } from "./Wheel";

export function Truck({ color }) {
    return (
        <group name="truck">
            <mesh name="body" position={[-15, 0, 25]} castShadow receiveShadow>
                <boxGeometry args={[70, 35, 35]} />
                <meshLambertMaterial color={0xffffff} flatShading />
            </mesh>
            <mesh name="cabin" position={[35, 0, 20]} castShadow receiveShadow>
                <boxGeometry args={[30, 30, 30]} />
                <meshLambertMaterial color={color} flatShading />
            </mesh>
            <Wheel x={-35} />
            <Wheel x={5} />
            <Wheel x={37} />
        </group>
    );
}
