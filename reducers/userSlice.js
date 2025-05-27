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
    updateUser: (state, action) => {
      state.value.currentLevelID = action.payload.currentLevelID;
      state.value.currentSubLevelID = action.payload.currentSubLevelID;
      state.value.xp = action.payload.xp;
    },
  },
});

export const { addUserToStore, removeUserToStore, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
