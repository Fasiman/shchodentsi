import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://696f45bda06046ce6185fca4.mockapi.io/articles";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    try {
      const { data } = await axios.get(API_URL);
      return data;
    } catch (error) {
      console.log(error)
    }
  },
);

export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (articleData, { dispatch }) => {
    try {
      const { data } = await axios.post(API_URL, articleData);
      dispatch(fetchArticles());
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const savedArticle = localStorage.getItem("currentArticle");
const parsedArticle = savedArticle ? JSON.parse(savedArticle) : null;

const initialState = {
  items: [],
  currentArticle: parsedArticle,
  status: "idle", 
  error: null,
  filter: "Всі статті",
  currentPage: 1,
  articlesPerPage: 9,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
      state.currentPage = 1; 
    },
    setCurrentArticle(state, action) {
      state.currentArticle = action.payload;
      localStorage.setItem("currentArticle", JSON.stringify(action.payload));
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.currentArticle = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createArticle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilter, setCurrentArticle, setCurrentPage } = articlesSlice.actions;
export default articlesSlice.reducer;