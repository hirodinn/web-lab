import { useSelector } from "react-redux";
import TodoColumn from "./TodoColumn";

export default function TodoBoard() {
  const { todos, categories } = useSelector((s) => s.todosInfo);

  return (
    <div className="flex gap-6 px-6 pb-5 overflow-x-auto items-start h-(--h) no-scrollbar">
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
