import React from "react";
import { useState } from "react";

function App() {
  const [items, setItems] = React.useState([]);

  const checkItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  };

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const deleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className={"app"}>
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackagingList
        items={items}
        onDeleteItem={deleteItem}
        onCheckItem={checkItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🏝️Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className={"add-form"} onSubmit={handleSubmit}>
      <h3>What do you need for 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type={"text"}
        placeholder={"Item..."}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackagingList({ items, onDeleteItem, onCheckItem }) {
  return (
    <div className={"list"}>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
          />
        ))}
      </ul>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Item({ item, onDeleteItem, onCheckItem }) {
  return (
    <li>
      <input
        type={"checkbox"}
        value={item.packed}
        onChange={() => onCheckItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {/* eslint-disable-next-line react/prop-types */}
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
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

export default App;
