import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Todo } from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState(false);
  const formRef = useRef(null);

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

  function validateClick(e) {
    if (!formRef.current.contains(e.target)) {
      setAddTodo(false);
    }
  }

  return (
    <div className="min-h-screen box-border bg-custom">
      {addTodo && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center"
          onClick={validateClick}
        >
          <form
            ref={formRef}
            className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">New Todo</h2>
            <input
              type="text"
              placeholder="Todo Title"
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setAddTodo(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="w-[90%] max-w-200 mx-auto min-h-screen box-border pt-16 flex flex-col pb-6 items-center gap-3">
        <div
          className="py-3 px-7 rounded-2xl bg-green-400 text-white"
          onClick={() => {
            setAddTodo(true);
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
