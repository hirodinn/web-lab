import { useMemo, useState } from "react";
import TodoCard from "./TodoCard";

export default function TodoColumn({ category, todos }) {
  const [sort, setSort] = useState(false);

  const result = useMemo(() => {
    if (!sort) return todos;

    return [...todos].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [todos, sort]);

  return (
    <div
      className="min-w-90 p-3 rounded-xl"
      style={{ backgroundColor: `${category.color}` }}
    >
      <div className="flex justify-between mb-3">
        <h3 style={{ color: category.color }} className="font-semibold">
          {category.name}
        </h3>
        <h3 onClick={() => setSort(!sort)}>{sort ? "Unsort" : "Sort"}</h3>
      </div>

      <div className="flex flex-col gap-3">
        {result.map((todo) => (
          <TodoCard key={todo.id} todo={todo} color={category.color} />
        ))}
      </div>
    </div>
  );
}
