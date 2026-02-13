import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    users: usersReducer,
  },
});

export default store;