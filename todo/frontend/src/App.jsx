import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setTodos, setAddTodo, setCategories } from "./redux/todoInfoAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Todo } from "./components/Todo";
import Addtodo from "./components/Addtodo";
import { Theme } from "./components/Theme";

function App() {
  const todos = useSelector((state) => state.todosInfo.todos);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sorted, setSorted] = useState(false);
  const addTodo = useSelector((state) => state.todosInfo.addtodo);
  const dark = useSelector((state) => state.todosInfo.darkMode);
  const categories = useSelector((state) => state.todosInfo.categories);

  const dispatch = useDispatch();

  const API_TODOS = "http://localhost:3001/todos";
  const API_CATEGORIES = "http://localhost:3001/categories";

  useEffect(() => {
    async function loadTodos() {
      try {
        const res = await axios.get(API_TODOS);
        dispatch(setTodos(res.data));
      } catch (ex) {
        console.log(ex);
      }
    }
    async function loadCategories() {
      try {
        const res = await axios.get(API_CATEGORIES);
        dispatch(setCategories(res.data));
      } catch (ex) {
        console.log(ex);
      }
    }
    loadTodos();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let temp;
    if (selectedCategories.length === 0) temp = [...todos];
    else {
      temp = todos.filter((todo) => selectedCategories.includes(todo.category));
    }
    if (sorted) {
      temp = temp.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    console.log(temp);
    setSelectedTodos(temp);
  }, [selectedCategories, todos, sorted]);

  function handleSelected(name) {
    if (selectedCategories.includes(name)) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory != name
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, name]);
    }
  }

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
                style={{
                  borderColor: category.color,
                  backgroundColor: selectedCategories.includes(category.name)
                    ? category.color
                    : "transparent",
                }}
                key={i}
                onClick={() => {
                  handleSelected(category.name);
                }}
              >
                {category.name}
              </div>
            );
          })}
        </div>
        <div className="w-full flex flex-col gap-0.5 overflow-y-scroll no-scrollbar">
          {selectedTodos.map((todo, i) => {
            return <Todo todo={todo} key={i} />;
          })}
        </div>
        <div className="flex justify-between w-full">
          <div
            className="px-5 py-3 border-2 rounded-2xl cursor-pointer"
            onClick={() => {
              setSorted(!sorted);
            }}
          >
            {sorted ? "Unsort" : "Sort By Date"}
          </div>
          <div
            className="
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
            <i className="fas fa-plus"></i>
            <span className="font-semibold">Add Todo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
