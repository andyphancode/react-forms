import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
    const [boxes, setBoxes] = useState([]);
    const add = newBox => {
        setBoxes(boxes => [...boxes, newBox]);
    }
    const remove = id => {
        setBoxes(boxes => boxes.filter(box => box.id !== id));
    }
    const boxComponents = boxes.map(box => (
        <Box
            key={box.id}
            id={box.id}
            width={box.width}
            height={box.height}
            handleRemove={remove}
            backgroundColor={box.backgroundColor}    
        />
    ));
    return (
        <div className="BoxList">
            <NewBoxForm createBox={add} />
            {boxComponents}
        </div>
    );
}

export default BoxList;