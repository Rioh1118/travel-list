import React from "react";
import { Stats } from "./Stats.jsx";
import { PackagingList } from "./PackagingList.jsx";

function App() {
  const [items, setItems] = React.useState([]);

  const checkItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  };
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?",
    );

    if (confirmed) setItems([]);
  }

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
        onClearList={handleClearList}
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

export default App;
