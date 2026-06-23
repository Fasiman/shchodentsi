import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:1487/user";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_URL);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API_URL, userData);
      
      return data;
    } catch (error) {
      console.error("Error registering user:", error.message);
      // If backend doesn't allow POST (404), fall back to client-side creation
      if (error.response && error.response.status === 404) {
        console.warn("Backend does not allow creating users (404). Falling back to local creation.");
        const fallbackUser = {
          ...userData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };
        return fallbackUser;
      }

      return rejectWithValue(error.message || "Failed to register user");
    }
  }
);

const getInitialCurrentUser = () => {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting current user from local storage", error);
    return null;
  }
}

const initialState = {
  items: [],
  status: "idle",
  error: null,
  currentUser: getInitialCurrentUser(),
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action) {
        const user = state.items.find(u => u.email && u.email.toLowerCase() === action.payload.email.toLowerCase());
        if (user && user.password === action.payload.password) {
            state.currentUser = user;
            state.error = null;
            try {
              localStorage.setItem('currentUser', JSON.stringify(user));
            } catch (error) {
              console.error("Error setting current user in local storage", error);
            }
        } else if (user && user.password !== action.payload.password) {
            state.currentUser = null;
            state.error = "wrong_password";
        } else {
            state.currentUser = null;
            state.error = "user_not_found";
        }
    },
    logout(state) {
        state.currentUser = null;
        try {
          localStorage.removeItem('currentUser');
        } catch (error) {
          console.error("Error removing current user from local storage", error);
        }
    },
    updateCurrentUser(state, action) {
        state.currentUser = action.payload;
        try {
          localStorage.setItem('currentUser', JSON.stringify(action.payload));
        } catch (error) {
          console.error("Error updating current user in local storage", error);
        }
    },
    resetError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.currentUser = action.payload;
        try {
          localStorage.setItem('currentUser', JSON.stringify(action.payload));
        } catch (error) {
          console.error("Error setting current user in local storage", error);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { login, logout, updateCurrentUser, resetError } = usersSlice.actions;
export default usersSlice.reducer;