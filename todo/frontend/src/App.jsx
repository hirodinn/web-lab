import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setTodos, setAddTodo } from "./redux/todoInfoAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Todo } from "./components/Todo";
import Addtodo from "./components/Addtodo";

function App() {
  const todos = useSelector((state) => state.todosInfo.todos);
  const addTodo = useSelector((state) => state.todosInfo.addtodo);

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
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen box-border bg-custom">
      {addTodo && <Addtodo />}
      <div className="w-[90%] max-w-200 mx-auto min-h-screen box-border pt-16 flex flex-col pb-6 items-center gap-3">
        <div
          className="py-3 px-7 rounded-2xl bg-green-400 text-white cursor-pointer"
          onClick={() => {
            dispatch(setAddTodo(true));
          }}
        >
          Add Todo
        </div>
        <div className="w-full flex flex-col gap-0.5">
          {todos.map((todo, i) => {
            return <Todo todo={todo} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
