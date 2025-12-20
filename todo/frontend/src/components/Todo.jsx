import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  setTodos,
  setAddTodo,
  setInitialValues,
} from "../redux/todoInfoAction";
import { useDispatch } from "react-redux";
import axios from "axios";
export function Todo({ todo }) {
  const todos = useSelector((state) => state.todosInfo.todos);
  const dispatch = useDispatch();

  const [color, setColor] = useState("black");
  useEffect(() => {
    async function loadCategoryColor() {
      try {
        const res = await axios.get(
          `http://localhost:3001/categories?name=${todo.category}`
        );
        setColor(res.data[0].color);
      } catch (ex) {
        console.log(ex);
      }
    }
    loadCategoryColor();
  }, [todo]);

  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:3001/todos/${todo.id}`);
      const temp = todos.filter((t) => t.id !== todo.id);
      dispatch(setTodos(temp));
    } catch (ex) {
      console.log(ex);
    }
  }

  function handleEdit() {
    const initialValues = {
      title: todo.title,
      description: todo.description,
      date: todo.date,
      category: todo.category,
      id: todo.id,
    };
    dispatch(setInitialValues(initialValues));
    dispatch(setAddTodo(true));
  }

  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      className="py-3.5 px-5 border-4 w-full"
      style={{ borderColor: color }}
    >
      <div className="flex gap-2 items-center">
        <p className="flex-1 text-wrap font-bold">{todo.title}</p>
        <div className="flex gap-1">
          <button className="cursor-pointer" onClick={handleEdit}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="cursor-pointer" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      {showDescription && <div>{todo.description}</div>}
      <div className="flex justify-between">
        <p>{todo.category}</p>
        <p>{todo.date}</p>
      </div>
    </div>
  );
}
