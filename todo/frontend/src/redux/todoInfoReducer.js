const initialValue = {
  todos: [],
  darkMode: JSON.parse(localStorage.getItem("dark")) || false,
  addtodo: false,
  initialValues: null,
};
export default function TodoReducer(state = initialValue, action) {
  if (action.type === "SETTODOS") {
    const temp = { ...state };
    temp.todos = action.payload;
    return temp;
  } else if (action.type === "THEME") {
    const temp = { ...state };
    temp.darkMode = action.payload;
    localStorage.setItem("dark", action.payload);
    return temp;
  } else if (action.type === "SETADDTODO") {
    const temp = { ...state };
    temp.addtodo = action.payload;
    return temp;
  } else if (action.type === "SETINITIALVALUES") {
    const temp = { ...state };
    temp.initialValues = action.payload;
    return temp;
  } else {
    return state;
  }
}
