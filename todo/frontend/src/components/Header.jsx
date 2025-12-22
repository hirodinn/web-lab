import { useDispatch, useSelector } from "react-redux";
import {
  makeDark,
  setAddTodo,
  setInitialValues,
} from "../redux/todoInfoAction";

export default function Header() {
  const dispatch = useDispatch();
  const dark = useSelector((s) => s.todosInfo.darkMode);

  return (
    <div className="flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold dark:text-white">Todo Board</h1>

      <div className="flex gap-3">
        <button
          onClick={() => dispatch(makeDark(!dark))}
          className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          🌙
        </button>

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
