import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    photoUrl: "",
    username: "testUserRedux",
    admin: false,
    sportPlayed: "",
    xp: "",
    level: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
    removeUserToStore: (state, action) => {
      state.value = initialState.value;
    },
  },
});

export const { addUserToStore, removeUserToStore } = userSlice.actions;
export default userSlice.reducer;
