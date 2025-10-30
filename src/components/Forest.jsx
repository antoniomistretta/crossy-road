import { Grass } from "./Grass";
import { Tree } from "./Tree";

export function Forest({ rowIndex, rowData }) {
    return (
        <Grass rowIndex={rowIndex}>
            {rowData.trees.map((tree, index) => (
                <Tree
                    key={index}
                    tileIndex={tree.tileIndex}
                    height={tree.height}
                />
            ))}
        </Grass>
    );
}
