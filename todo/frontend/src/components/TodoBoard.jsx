import { useSelector } from "react-redux";
import TodoColumn from "./TodoColumn";

export default function TodoBoard() {
  const { todos, categories } = useSelector((s) => s.todosInfo);

  return (
    <div className="flex gap-6 px-6 overflow-x-auto pb-6 no-scrollbar">
      {categories.map((cat) => (
        <TodoColumn
          key={cat.id}
          category={cat}
          todos={todos.filter((t) => t.category === cat.name)}
        />
      ))}
    </div>
  );
}
