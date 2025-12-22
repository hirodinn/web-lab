import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TodoBoard from "./components/TodoBoard";
import AddEditTodo from "./components/AddEditTodo";
import Header from "./components/Header";
import { setTodos, setCategories } from "./redux/todoInfoAction";

const API_TODOS = "http://localhost:3001/todos";
const API_CATEGORIES = "http://localhost:3001/categories";

export default function App() {
  const dispatch = useDispatch();
  const { darkMode, addtodo, initialValues } = useSelector((s) => s.todosInfo);

  useEffect(() => {
    axios.get(API_TODOS).then((res) => dispatch(setTodos(res.data)));
    axios.get(API_CATEGORIES).then((res) => dispatch(setCategories(res.data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-custom transition">
        <Header />
        <TodoBoard />
        {addtodo && <AddEditTodo />}
        {initialValues && <AddEditTodo edit />}
      </div>
    </div>
  );
}
