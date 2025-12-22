import { useMemo, useState } from "react";
import TodoCard from "./TodoCard";

export default function TodoColumn({ category, todos }) {
  const [sort, setSort] = useState(false);

  const result = useMemo(() => {
    if (!sort) return todos;

    return [...todos].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [todos, sort]);

  function getDarkerHsl(hsl, amount = 30) {
    // extract numbers from "hsl(h, s%, l%)"
    const match = hsl.match(/\d+/g);
    if (!match) return hsl;

    let [h, s, l] = match.map(Number);

    // reduce lightness safely
    l = Math.max(0, l - amount);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  return (
    <div
      className="min-w-90 p-3 rounded-xl overflow-y-scroll no-scrollbar mb-6"
      style={{ backgroundColor: `${category.color}` }}
    >
      <div className="flex justify-between mb-3">
        <h3
          style={{ color: getDarkerHsl(category.color) }}
          className="font-semibold"
        >
          {category.name}
        </h3>
        <h3 className="cursor-pointer" onClick={() => setSort(!sort)}>
          {sort ? "Unsort" : "Sort"}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {result.map((todo) => (
          <TodoCard key={todo.id} todo={todo} color={category.color} />
        ))}
      </div>
    </div>
  );
}
