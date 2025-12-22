import { useDispatch, useSelector } from "react-redux";
import {
  setAddTodo,
  setTodos,
  setInitialValues,
  setCategories,
} from "../redux/todoInfoAction";
import axios from "axios";
import { useState } from "react";

const API = "http://localhost:3001/todos";
const CateAPI = "http://localhost:3001/categories";

export default function AddEditTodo({ edit, category }) {
  const dispatch = useDispatch();
  const { initialValues, todos, categories } = useSelector((s) => s.todosInfo);

  const [form, setForm] = useState(
    initialValues || { title: "", description: "", date: "", category: "" }
  );

  const submit = async (e) => {
    e.preventDefault();
    const f = { ...form };
    if (category) {
      f.category = category;
    } else {
      f.category = f.category.trim();
      if (!f.category) {
        f.category = "uncategorized";
      }
    }
    if (!categories.includes(f.category)) {
      const res = await axios.post(CateAPI, {
        name: f.category,
        color: getRandomLightColor(),
      });
      dispatch(setCategories([...categories, res.data]));
    }
    if (edit) {
      const res = await axios.put(`${API}/${f.id}`, f);
      dispatch(setTodos(todos.map((t) => (t.id === f.id ? res.data : t))));
      dispatch(setInitialValues(null));
    } else {
      const res = await axios.post(API, f);
      dispatch(setTodos([...todos, res.data]));
      dispatch(setAddTodo(false));
    }
  };

  function getRandomLightColor() {
    const hue = Math.floor(Math.random() * 360); // any color hue
    const saturation = Math.floor(Math.random() * 30) + 70; // 70% - 100% saturation
    const lightness = Math.floor(Math.random() * 20) + 80; // 80% - 100% lightness for light shades
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-(--background-color) p-6 rounded-xl w-96"
      >
        <input
          className="w-full mb-2 border p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full mb-2 border p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          className="w-full mb-2 border p-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        {!category && (
          <input
            className="w-full mb-4 border p-2"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              dispatch(setAddTodo(false));
              dispatch(setInitialValues(null));
            }}
            className="px-3 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
