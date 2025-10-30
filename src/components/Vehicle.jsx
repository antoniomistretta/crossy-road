import { tileSize } from "../constants";
import { useRef } from "react";
import { Car } from "./Car";
import { Truck } from "./Truck";
import useVehicleAnimation from "../hooks/useVehicleAnimation";
import useHitDetection from "../hooks/useHitDetection";

export function Vehicle({ type, initialTileIndex, direction, speed, color, rowIndex }) {
    const vehicle = useRef(null);
    useVehicleAnimation(vehicle, direction, speed);
    useHitDetection(vehicle, rowIndex);

    return (
        <group
            name="vehicle"
            ref={vehicle}
            position-x={initialTileIndex * tileSize}
            rotation-z={direction === "left" ? Math.PI : 0}
        >
            {(() => {
                switch (type) {
                    case "car":
                        return <Car color={color} />;
                    case "truck":
                        return <Truck color={color} />;
                }
            })()}
        </group>
    );
}
