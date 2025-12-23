import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCategory, setAddTodo } from "../redux/todoInfoAction";
import TodoCard from "./TodoCard";

export default function TodoColumn({ category, todos }) {
  const [sort, setSort] = useState(false);
  const dispatch = useDispatch();
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
  if (!todos.length) return <></>;

  return (
    <div
      className="min-w-90 p-3 rounded-xl max-h-full overflow-y-scroll no-scrollbar box-border"
      style={{ backgroundColor: `${category.color}` }}
    >
      <div
        className="flex justify-between mb-3"
        style={{ color: getDarkerHsl(category.color) }}
      >
        <h3 className="font-extrabold text-2xl">{category.name}</h3>
        <h3 className="cursor-pointer" onClick={() => setSort(!sort)}>
          {sort ? "Unsort" : "Sort"}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {result.map((todo) => (
          <TodoCard key={todo.id} todo={todo} color={category.color} />
        ))}
      </div>
      <div
        className=" border-3 border-dashed rounded-xl flex items-center justify-center my-5 py-2 cursor-pointer hover:border-solid font-extrabold"
        style={{
          borderColor: getDarkerHsl(category.color),
          color: getDarkerHsl(category.color),
        }}
        onClick={() => {
          dispatch(setCurrentCategory(category.name));
          dispatch(setAddTodo(true));
        }}
      >
        Add Todo
      </div>
    </div>
  );
}
