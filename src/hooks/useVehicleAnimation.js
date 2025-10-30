import {
    tileSize,
    tilesPerRow,
    minTileIndex,
    maxTileIndex,
} from "../constants";
import { gsap } from "gsap";
import { useEffect } from "react";

export default function useVehicleAnimation(vehicleRef, direction, speed) {
    useEffect(() => {
        const vehicle = vehicleRef.current;
        const vehicleIndex = vehicle.position.x / tileSize;

        const distanceFromLeft = Math.abs(vehicleIndex - minTileIndex);
        const distanceFromRight = Math.abs(vehicleIndex - maxTileIndex);
        const progress =
            (direction === "left" ? distanceFromRight : distanceFromLeft) /
            tilesPerRow;

        const startingPoint =
            direction === "left"
                ? maxTileIndex * tileSize
                : minTileIndex * tileSize;

        const endingPoint =
            direction === "left"
                ? minTileIndex * tileSize
                : maxTileIndex * tileSize;

        const animation = gsap.fromTo(
            vehicle.position,
            { x: startingPoint },
            {
                x: endingPoint,
                duration: speed,
                ease: "none",
                repeat: -1,
            },
        );

        animation.progress(progress);

        return () => {
            animation.kill();
        };
    }, [vehicleRef, direction, speed]);
}
