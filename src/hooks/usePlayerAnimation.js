import { use } from "react";
import { GameContext } from "../stores/game";
import { tileSize, minTileIndex, maxTileIndex } from "../constants";
import { gsap } from "gsap";
import { useFrame } from "@react-three/fiber";
import useEventListeners from "./useEventListeners";
import { getMove, setMove } from "../stores/player";

let isMoving = false;

export default function usePlayerAnimation(playerRef) {
    const { gameState, rows, generateRows, score, increaseScore } = use(GameContext);

    useEventListeners();

    useFrame(() => {
        if (!playerRef) return;
        if (!getMove()) return;
        if (isMoving) return;
        if (gameState !== 'running') return;

        const player = playerRef.current;
        const currentIndex = player.position.x / tileSize;
        const currentRow = player.position.y / tileSize;
        const lowerstIndex = rows[0].index;

        const newPosition = {};
        const newRotation = {};

        switch (getMove()) {
            case "forward": {
                const nextRow = rows.find((row) => row.index === currentRow + 1);
                const obstacle = nextRow.trees?.find((tree) => tree.tileIndex === currentIndex);
                if (obstacle) return;

                newPosition.y = player.position.y + tileSize;
                newRotation.z = 0;

                const distanceToEndRow = rows.at(-1).index * tileSize - player.position.y;
                if (distanceToEndRow <= 10 * tileSize) {
                    generateRows(10);
                }

                const newScore = (player.position.y / tileSize) + 1;
                if (newScore > score) {
                    increaseScore();
                }

                break;
            }

            case "backward": {
                if (currentRow <= lowerstIndex) return;

                const nextRow = rows.find((row) => row.index === currentRow - 1);
                const obstacle = nextRow.trees?.find((tree) => tree.tileIndex === currentIndex);
                if (obstacle) return;

                newPosition.y = player.position.y - tileSize;
                newRotation.z = Math.PI;

                break;
            }

            case "left": {
                if (currentIndex <= minTileIndex) return;

                const nextRow = rows.find((row) => row.index === currentRow);
                const obstacle = nextRow.trees?.find((tree) => tree.tileIndex === currentIndex - 1);
                if (obstacle) return;

                newPosition.x = player.position.x - tileSize;
                newRotation.z = Math.PI / 2;

                break;
            }

            case "right": {
                if (currentIndex >= maxTileIndex) return;

                const nextRow = rows.find((row) => row.index === currentRow);
                const obstacle = nextRow.trees?.find((tree) => tree.tileIndex === currentIndex + 1);
                if (obstacle) return;

                newPosition.x = player.position.x + tileSize;
                newRotation.z = -Math.PI / 2;

                break;
            }
        }

        isMoving = true;

        gsap.timeline({
            defaults: { duration: 0.2, ease: "power1.out" },
            onComplete: () => {
                setMove(null);
                isMoving = false;
            },
        }).to(player.children[0].position, {
            z: player.position.z + 15,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
        }).to(player.position, newPosition, "<").to(player.children[0].rotation, newRotation, "<");
    });
}
