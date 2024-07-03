import React from "react";

export function Stats({items}) {
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage =
        numItems !== 0 ? Math.round((numPacked / numItems) * 100) : 0;

    return (
        <footer className={"stats"}>
            <em>
                {percentage === 100
                    ? `You got everything! Ready to go ✈️✈️✈️`
                    : ` 🧳 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}