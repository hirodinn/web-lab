import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./todoInfoReducer";

export const store = configureStore({
  reducer: {
    todosInfo: TodoReducer,
  },
});
