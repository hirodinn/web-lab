import { useEffect, useState } from "react";
import axios from "axios";
export function Todo({ todo }) {
  const [color, setColor] = useState("black");
  useEffect(() => {
    async function loadCategoryColor() {
      try {
        const res = await axios.get(
          `http://localhost:3001/categories?name=${todo.category}`
        );
        console.log(res.data[0].color);
        setColor(res.data[0].color);
      } catch (ex) {
        console.log(ex);
      }
    }
    loadCategoryColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      className="py-3.5 px-5 border-4 w-full"
      style={{ borderColor: color }}
    >
      <div className="flex gap-2 items-center">
        <p className="flex-1 text-wrap font-bold">{todo.title}</p>
        <div className="flex gap-1">
          <button className="cursor-pointer">
            <i className="fas fa-edit"></i>
          </button>
          <button className="cursor-pointer">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      {showDescription && <div>{todo.description}</div>}
      <div className="flex justify-between">
        <p>{todo.category}</p>
        <p>{todo.date}</p>
      </div>
    </div>
  );
}
