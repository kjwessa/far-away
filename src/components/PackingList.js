import { useState } from "react";
import Item from "./Item.js";

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  /* Sort by the default input field */
  if (sortBy === "input") sortedItems = items;

  /* Copy the array, sort by the list alphabetically */
  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  /* Copy the array, sort by the boolean value converted to a number */
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
