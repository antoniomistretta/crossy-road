import { Box3 } from 'three';
import { tileSize } from "../constants";
import { use } from "react";
import { useFrame } from "@react-three/fiber";
import { getPlayerRef } from "../stores/player";
import { GameContext } from "../stores/game";

export default function useHitDetection(vehicleRef, rowIndex) {
    const { setGameState } = use(GameContext);

    useFrame(() => {
        if (!vehicleRef) return;
        const vehicle = vehicleRef.current;
        const vehivleRowIndex = rowIndex;

        const player = getPlayerRef();
        if (!player) return;
        const playerRowIndex = Math.round(player.position.y / tileSize);

        if (Math.abs(vehivleRowIndex - playerRowIndex) > 1) return;

        const vehicleBoundingBox = new Box3().setFromObject(vehicle);
        const playerBoundingBox = new Box3().setFromObject(player);

        if (vehicleBoundingBox.intersectsBox(playerBoundingBox)) {
           setGameState('over');
        }
    });
}