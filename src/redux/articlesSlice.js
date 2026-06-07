import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:1487/";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_URL);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      return rejectWithValue(error.message || "Failed to fetch articles");
    }
  },
);

export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (articleId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/${articleId}`);
      return data;
    } catch (error) {
      console.error("Error fetching article:", error.message);
      return rejectWithValue(error.message || "Failed to fetch article");
    }
  }
);

export const updateArticleSaves = createAsyncThunk(
  "articles/updateArticleSaves",
  async ({ id, saveCount }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, { saveCount });
      return data;
    } catch (error) {
      console.error("Error updating article saves:", error.message);
      return rejectWithValue(error.message || "Failed to update article");
    }
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (articleData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(API_URL, articleData);
      dispatch(fetchArticles());
      return data;
    } catch (error) {
      console.error("Error creating article:", error.message);
      return rejectWithValue(error.message || "Failed to create article");
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
      .addCase(updateArticleSaves.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
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