import { useEffect } from "react";
import { getMove, setMove } from "../stores/player";

export default function useEventListeners() {
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    event.preventDefault();
                    setMove("forward");
                    break;
                case "ArrowDown":
                case "KeyS":
                    event.preventDefault();
                    setMove("backward");
                    break;
                case "ArrowLeft":
                case "KeyA":
                    event.preventDefault();
                    setMove("left");
                    break;
                case "ArrowRight":
                case "KeyD":
                    event.preventDefault();
                    setMove("right");
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    event.preventDefault();
                    if (getMove() === "forward") {
                        setMove(null);
                    }
                    break;
                case "ArrowDown":
                case "KeyS":
                    event.preventDefault();
                    if (getMove() === "backward") {
                        setMove(null);
                    }
                    break;
                case "ArrowLeft":
                case "KeyA":
                    event.preventDefault();
                    if (getMove() === "left") {
                        setMove(null);
                    }
                    break;
                case "ArrowRight":
                case "KeyD":
                    event.preventDefault();
                    if (getMove() === "right") {
                        setMove(null);
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);
        };
    }, []);
}
