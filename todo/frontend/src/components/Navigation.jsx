import { useDispatch } from "react-redux";
import { setCategories, setTodos } from "../redux/todoInfoAction";
import { useEffect, useState } from "react";
import axios from "axios";

const API_TODOS = "http://localhost:3001/todos";
const API_CATEGORIES = "http://localhost:3001/categories";

export function Navigation() {
  const [cate, setCate] = useState([]);
  const [categoryValue, setCategoryValue] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadCate() {
      let result = await axios.get(API_CATEGORIES);
      setCate(result.data);
    }
    loadCate();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      let result = await axios.get(API_CATEGORIES);
      result = result.data;
      console.log(result);
      if (categoryValue !== "all") {
        result = result.filter((cate) => cate.name === categoryValue);
      }
      dispatch(setCategories(result));
    }
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryValue]);

  async function loadTodos(e) {
    e.preventDefault();
    let result = await axios.get(API_TODOS);
    result = result.data;
    if (categoryValue !== "all") {
      result = result.filter((todo) => todo.category === categoryValue);
    }
    const input = inputValue.trim();
    if (input) {
      result = result.filter(
        (todo) => todo.title.includes(input) || todo.description.includes(input)
      );
    }
    console.log(result);
    dispatch(setTodos(result));
  }
  return (
    <div
      className="flex items-center justify-between gap-4
             px-6 py-3 rounded-2xl
              mb-1"
    >
      <form
        className="flex items-center gap-2
               px-3 py-2 rounded-lg
               w-full max-w-xs outline"
        onSubmit={loadTodos}
      >
        <i className="fa fa-search text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search here"
          className="bg-transparent outline-none w-full
                 text-sm text-gray-800 dark:text-gray-100
                 placeholder:text-gray-400"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </form>

      <div className="flex items-center gap-3">
        <select
          className="px-3 py-2 rounded-lg border
                 text-sm"
          onChange={(e) => {
            setCategoryValue(e.target.value);
          }}
        >
          <option value="all" className="text-black">
            All tasks
          </option>
          {cate.map((category, i) => (
            <option value={category.name} key={i} className="text-black">
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
