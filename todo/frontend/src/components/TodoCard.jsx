import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, setInitialValues } from "../redux/todoInfoAction";

const API = "http://localhost:3001/todos";

export default function TodoCard({ todo, color }) {
  const dispatch = useDispatch();
  const todos = useSelector((s) => s.todosInfo.todos);
  const del = async () => {
    await axios.delete(`${API}/${todo.id}`);
    dispatch(setTodos(todos.filter((t) => t.id !== todo.id)));
  };

  return (
    <div
      className="bg-(--background-color) text-(--text-color) p-3 rounded-xl shadow border-l-4 group relative"
      style={{ borderColor: color }}
    >
      <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
        <i
          className="fa-solid fa-pen text-blue-500 cursor-pointer"
          onClick={() => dispatch(setInitialValues(todo))}
        ></i>
        <i
          className="fa-solid fa-trash text-red-500 cursor-pointer"
          onClick={del}
        ></i>
      </div>

      <h4 className="font-semibold">{todo.title}</h4>
      <p className="text-xs text-gray-500">{todo.description}</p>
      <span className="text-xs text-gray-400">{todo.date}</span>
    </div>
  );
}
