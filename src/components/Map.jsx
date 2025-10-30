import { use } from "react";
import { GameContext } from "../stores/game";
import { Row } from "./Row";
import { useEffect } from "react";

export function Map() {
    const { rows, generateRows } = use(GameContext);

    useEffect(() => {
        generateRows(10);
    }, []);

    return (
        <>
            {rows.map((rowData, rowIndex) => (
                <Row key={rowIndex} rowIndex={rowData.index} rowData={rowData} />
            ))}
        </>
    );
}
