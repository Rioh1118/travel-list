// eslint-disable-next-line react/prop-types
import React from "react";

export function Item({item, onDeleteItem, onCheckItem}) {
    return (
        <li>
            <input
                type={"checkbox"}
                value={item.packed}
                onChange={() => onCheckItem(item.id)}
            />
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {/* eslint-disable-next-line react/prop-types */}
                {item.quantity} {item.description}
      </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}