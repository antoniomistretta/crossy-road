import { createContext, useState } from "react";
import { minTileIndex, maxTileIndex } from "../constants";
import { getPlayerRef } from "../stores/player";

const GameContext = createContext();

const randomElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const generateRow = (index) => {
    const type = randomElement(["forest", "road"]);
    const rowData = {index: index};

    switch (type) {
        case "forest": {
            rowData.trees = [];

            const occupiedTiles = [];
            for (let i = 0; i < randomNumber(0, 5); i++) {
                let randomIndex;

                do {
                    randomIndex = randomNumber(minTileIndex, maxTileIndex);
                } while (occupiedTiles.includes(randomIndex));

                occupiedTiles.push(randomIndex);

                rowData.trees.push({
                    tileIndex: randomIndex,
                    height: randomElement([30, 50]),
                });
            }
            break;
        }

        case "road": {
            rowData.vehicles = [];
            rowData.direction = randomElement(["left", "right"]);
            rowData.speed = randomNumber(3, 6);

            const occupiedTiles = [];
            for (let i = 0; i < randomNumber(1, 3); i++) {
                const vehicleType = randomElement(["car", "truck"]);
                const color = randomElement([0xff0000, 0x00ff00, 0x0000ff]);

                let randomIndex;

                do {
                    randomIndex = randomNumber(minTileIndex, maxTileIndex);
                } while (occupiedTiles.includes(randomIndex));

                occupiedTiles.push(randomIndex);
                occupiedTiles.push(randomIndex - 1);
                occupiedTiles.push(randomIndex + 1);

                if (vehicleType === "truck") {
                    occupiedTiles.push(randomIndex - 2);
                    occupiedTiles.push(randomIndex + 2);
                }

                rowData.vehicles.push({
                    type: vehicleType,
                    initialTileIndex: randomIndex,
                    color: color,
                });
            }
            break;
        }
    }

    return {
        type: type,
        ...rowData,
    };
};

const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState('running');
    const [score, setScore] = useState(0);

    const increaseScore = () => setScore(score + 1);

    const [rows, setRows] = useState(
        Array(12)
            .fill()
            .map((_, index) => ({
                type: "grass",
                index: index - 10,
            })),
    );

    const reset = () => {
        setGameState('running');
        setScore(0);

        const player = getPlayerRef();
        player.position.x = 0;
        player.position.y = 0;
    };

    const generateRows = (numberOfRows) => {
        const newRows = [];
        let startingIndex = rows.at(-1).index;

        for (let i = 0; i < numberOfRows; i++) {
            startingIndex += 1;
            newRows.push(generateRow(startingIndex));
        }

        setRows([...rows, ...newRows]);
    };

    return (
        <GameContext
            value={{ reset, gameState, setGameState, rows, generateRows, score, increaseScore }}
        >
            {children}
        </GameContext>
    );
};

export { GameContext, GameProvider };
