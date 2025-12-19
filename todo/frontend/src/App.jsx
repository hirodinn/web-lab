import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function loadTodos() {
      try {
        const res = await axios.get("http://localhost:3001/todos");
        setTodos(res.data);
      } catch (ex) {
        console.log(ex);
      }
    }
    loadTodos();
  }, []);

  return (
    <div className="min-h-screen box-border bg-custom">
      <div className="w-[90%] max-w-200 mx-auto min-h-screen box-border pt-16 flex flex-col pb-6 items-center gap-3">
        <div className="py-3 px-7 rounded-2xl bg-green-400 text-white">
          Add Todo
        </div>
        {todos.map((todo, i) => {
          <Todo todo={todo} key={i} />;
        })}
      </div>
    </div>
  );
}

export default App;
