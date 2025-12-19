import { useEffect, useState } from "react";
import axios from "axios";
export function Todo({ todo }) {
  const [color, setColor] = useState("black");
  useEffect(() => {
    async function loadCategoryColor() {
      try {
        const res = await axios.get(
          `http://localhost:3001/category/${todo.category}`
        );
        setColor(res.data.color);
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
      className={`py-3.5 px-5 border-2 border-${color}-700`}
    >
      <div className="flex gap-2 items-center">
        <p className="flex-1 text-wrap">{todo.title}</p>
        <div>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
      {showDescription && <div>{todo.description}</div>}
      <div className="flex justify-end">{todo.date}</div>
    </div>
  );
}
