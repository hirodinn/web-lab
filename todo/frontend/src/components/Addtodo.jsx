import { useRef, useState, useEffect } from "react";
import axios from "axios";

const API_TODOS = "http://localhost:3001/todos";
const API_CATEGORIES = "http://localhost:3001/categories";

export default function Addtodo({
  setAddTodo,
  setTodos,
  todos,
  initialValues,
  setInitialValues,
}) {
  const formRef = useRef();

  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [date, setDate] = useState(initialValues?.date || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [categories, setCategories] = useState([]);

  // Load categories from JSON Server
  useEffect(() => {
    axios.get(API_CATEGORIES).then((res) => setCategories(res.data));
  }, []);

  // Submit new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return;

    const cat =
      category.trim().toLowerCase().length > 0
        ? category.trim().toLowerCase()
        : "uncategorized";

    const newTodo = {
      title,
      description,
      category: cat,
      date,
    };

    const categoryExists = categories.some((c) => c.name.toLowerCase() === cat);
    if (!categoryExists) {
      const res = await axios.post(API_CATEGORIES, {
        name: cat,
        color: getRandomBoldColor(),
      });
      // Add new category to state so we can reuse it immediately
      setCategories([...categories, res.data]);
    }
    if (!initialValues) {
      const res = await axios.post(API_TODOS, newTodo);
      setTodos([...todos, res.data]); // Update parent state
    } else {
      const res = await axios.put(
        `http://localhost:3001/todos/${initialValues.id}`,
        newTodo
      );

      const updatedTodos = todos.map((todo) =>
        todo.id === initialValues.id ? res.data : todo
      );

      setTodos(updatedTodos);
    }

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setDate("");
    setAddTodo(false);
    setInitialValues(null);
  };
  // Close modal when clicking outside form

  function validateClick(e) {
    if (!formRef.current.contains(e.target)) {
      setInitialValues(null);
      setAddTodo(false);
    }
  }
  function getRandomBoldColor() {
    const hue = Math.floor(Math.random() * 360); // any hue
    const saturation = 80; // high saturation = bold
    const lightness = 50; // medium brightness
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
        className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md"
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
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => {
              setInitialValues(null);
              setAddTodo(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}
