import { useDispatch } from "react-redux";
import { Theme } from "./Theme";
import { setAddTodo, setInitialValues } from "../redux/todoInfoAction";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold text-(--text-color)">Todo Board</h1>

      <div className="flex gap-3 items-center">
        <Theme />
        <button
          onClick={() => {
            dispatch(setInitialValues(null));
            dispatch(setAddTodo(true));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:-translate-y-0.5"
        >
          <i className="fas fa-plus"></i> Add Todo
        </button>
      </div>
    </div>
  );
}
