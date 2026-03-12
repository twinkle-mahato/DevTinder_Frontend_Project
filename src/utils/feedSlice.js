import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, actions) => {
      // filter loops through every user in feed
      // if user._id is NOT EQUAL to actions.payload → KEEP ✅
      // if user._id is EQUAL to actions.payload     → REMOVE ❌

      const newFeed = state.filter((user) => user._id !== actions.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
