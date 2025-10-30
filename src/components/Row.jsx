import { Grass } from "./Grass";
import { Forest } from "./Forest";
import { Road } from "./Road";
import { Vehicle } from "./Vehicle";

export function Row({ rowIndex, rowData }) {
    switch (rowData.type) {
        case "grass":
            return <Grass rowIndex={rowIndex} />;
        case "forest":
            return <Forest rowIndex={rowIndex} rowData={rowData} />;
        case "road":
            return (
                <Road rowIndex={rowIndex}>
                    {rowData.vehicles?.map((vehicle, index) => (
                        <Vehicle
                            key={index}
                            type={vehicle.type}
                            rowIndex={rowIndex}
                            initialTileIndex={vehicle.initialTileIndex}
                            direction={rowData.direction}
                            speed={rowData.speed}
                            color={vehicle.color}
                        />
                    ))}
                </Road>
            );
    }
}
