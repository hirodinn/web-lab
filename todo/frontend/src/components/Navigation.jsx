import { useSelector, useDispatch } from "react-redux";
import { setCategories, setTodos } from "../redux/todoInfoAction";
import { useEffect, useState } from "react";
export function Navigation() {
  const { categories } = useSelector((s) => s.todosInfo);
  useEffect(() => {
    async function loadTodos() {}
  }, []);
  return (
    <div
      className="flex items-center justify-between gap-4
             px-6 py-3 rounded-2xl
             shadow-sm"
    >
      {/* Search */}
      <form
        className="flex items-center gap-2
               bg-gray-100 dark:bg-gray-700
               px-3 py-2 rounded-lg
               w-full max-w-xs"
      >
        <i className="fa fa-search text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search here"
          className="bg-transparent outline-none w-full
                 text-sm text-gray-800 dark:text-gray-100
                 placeholder:text-gray-400"
        />
      </form>

      <div className="flex items-center gap-3">
        {/* Filter */}
        <select
          className="px-3 py-2 rounded-lg border
                 bg-gray-100 dark:bg-gray-700
                 text-sm text-gray-700 dark:text-gray-200"
        >
          <option>All tasks</option>
          {categories.map((category, i) => (
            <option value={category.name} key={i}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
