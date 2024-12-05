import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  loading: false,
  user: null,
};

// Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set user data
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export actions
export const { setLoading, setUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
