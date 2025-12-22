import { useDispatch } from "react-redux";
import { Theme } from "./Theme";
import { setAddTodo, setInitialValues } from "../redux/todoInfoAction";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold dark:text-white">Todo Board</h1>

      <div className="flex gap-3">
        <Theme />
        <button
          onClick={() => {
            dispatch(setInitialValues(null));
            dispatch(setAddTodo(true));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Todo
        </button>
      </div>
    </div>
  );
}
