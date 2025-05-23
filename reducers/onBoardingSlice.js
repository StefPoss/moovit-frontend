import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {
    addInfoToStore: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
    removeAllInfoToStore: (state, action) => {
      state.value = initialState.value;
    },
  },
});

export const { addInfoToStore, removeAllInfoToStore } = onBoardingSlice.actions;
export default onBoardingSlice.reducer;
