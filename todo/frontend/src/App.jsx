import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setTodos, setAddTodo, setCategories } from "./redux/todoInfoAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Todo } from "./components/Todo";
import Addtodo from "./components/Addtodo";
import { Theme } from "./components/Theme";

function App() {
  const todos = useSelector((state) => state.todosInfo.todos);
  const addTodo = useSelector((state) => state.todosInfo.addtodo);
  const dark = useSelector((state) => state.todosInfo.darkMode);
  const categories = useSelector((state) => state.todosInfo.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadTodos() {
      try {
        const res = await axios.get("http://localhost:3001/todos");
        dispatch(setTodos(res.data));
      } catch (ex) {
        console.log(ex);
      }
    }
    async function loadCategories() {
      try {
        const res = await axios.get("http://localhost:3001/categories");
        dispatch(setCategories(res.data));
      } catch (ex) {
        console.log(ex);
      }
    }
    loadTodos();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`h-screen box-border bg-custom ${
        dark && "dark"
      } text-(--text-color)`}
    >
      <div className="absolute top-2 left-2">
        <Theme />
      </div>
      {addTodo && <Addtodo />}
      <div className="w-[90%] max-w-200 mx-auto h-screen box-border pt-16 flex flex-col pb-6 items-center gap-3 overflow-hidden">
        <div className="w-full flex flex-wrap gap-3 justify-center">
          {categories.map((category, i) => {
            return (
              <div
                className="py-3 px-6 border-2 rounded-lg cursor-pointer hover:-translate-y-1"
                style={{ borderColor: category.color }}
                key={i}
              >
                {category.name}
              </div>
            );
          })}
        </div>
        <div className="w-full flex flex-col gap-0.5 overflow-y-scroll no-scrollbar">
          {todos.map((todo, i) => {
            return <Todo todo={todo} key={i} />;
          })}
        </div>
        <div
          className="
          ml-auto
    flex items-center gap-2
    bg-blue-600 text-white
    px-5 py-3
    rounded-2xl
    shadow-lg
    hover:bg-blue-700
    hover:scale-102
    active:scale-98
    transition-all duration-200
    cursor-pointer
  "
          onClick={() => {
            dispatch(setAddTodo(true));
          }}
        >
          <i className="fa-solid fa-plus"></i>
          <span className="font-semibold">Add Todo</span>
        </div>
      </div>
    </div>
  );
}

export default App;
