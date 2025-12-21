import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  setTodos,
  setAddTodo,
  setInitialValues,
  setCategories,
} from "../redux/todoInfoAction";
import { useDispatch } from "react-redux";
import axios from "axios";

const API_TODOS = "http://localhost:3001/todos";
const API_CATEGORIES = "http://localhost:3001/categories";

export default function Addtodo() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosInfo.todos);
  const initialValues = useSelector((state) => state.todosInfo.initialValues);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [date, setDate] = useState(initialValues?.date || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const categories = useSelector((state) => state.todosInfo.categories);

  // Submit new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return;

    const cat =
      category.trim().toLowerCase().length > 0
        ? category.trim().toLowerCase()
        : "uncategorized";

    const completed = initialValues.completed ? initialValues.completed : false;

    const newTodo = {
      title,
      description,
      category: cat,
      date,
      completed,
    };

    const categoryExists = categories.some((c) => c.name.toLowerCase() === cat);
    if (!categoryExists) {
      const res = await axios.post(API_CATEGORIES, {
        name: cat,
        color: getRandomBoldColor(),
      });
      // Add new category to state so we can reuse it immediately
      dispatch(setCategories([...categories, res.data]));
    }
    if (!initialValues) {
      const res = await axios.post(API_TODOS, newTodo);
      dispatch(setTodos([...todos, res.data])); // Update parent state
    } else {
      const res = await axios.put(
        `http://localhost:3001/todos/${initialValues.id}`,
        newTodo
      );

      const updatedTodos = todos.map((todo) =>
        todo.id === initialValues.id ? res.data : todo
      );

      dispatch(setTodos(updatedTodos));
    }

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setDate("");
    dispatch(setAddTodo(false));
    dispatch(setInitialValues(null));
  };
  // Close modal when clicking outside form

  function validateClick(e) {
    if (!formRef.current.contains(e.target)) {
      dispatch(setInitialValues(null));
      dispatch(setAddTodo(false));
    }
  }
  function getRandomBoldColor() {
    const hue = Math.floor(Math.random() * 360); // full hue range
    const saturation = Math.floor(Math.random() * 30) + 70; // 70–100% saturation
    const lightness = Math.floor(Math.random() * 20) + 40; // 40–60% lightness
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={validateClick}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-(--background-color) p-6 rounded-xl shadow-lg w-[90%] max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Add New Todo</h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Category Dropdown */}
        <input
          type="text"
          placeholder="uncategorized"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2 rounded-xl text-white font-semibold shadow cursor-pointer"
            onClick={() => {
              dispatch(setInitialValues(null));
              dispatch(setAddTodo(false));
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-xl text-white font-semibold shadow cursor-pointer"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}
