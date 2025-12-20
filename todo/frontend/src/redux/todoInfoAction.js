export function setTodos(obj) {
  return {
    type: "SETTODOS",
    payload: obj,
  };
}
export function makeDark(val) {
  return {
    type: "THEME",
    payload: val,
  };
}
export function setInitialValues(obj) {
  return {
    type: "SETINITIALVALUES",
    payload: obj,
  };
}
export function setAddTodo(val) {
  return {
    type: "SETADDTODO",
    payload: val,
  };
}
export function setCategories(obj) {
  return {
    type: "SETCATEGORIES",
    payload: obj,
  };
}
