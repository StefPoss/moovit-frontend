import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:"ll"
  
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivityToStore: (state, action) => {
      state.value = action.payload;
      
    },
    removeActivityToStore: (state, action) => {
      state.value = initialState.value;
    },
  },
});

export const { addActivityToStore, removeActivityToStore } = activitySlice.actions;
export default activitySlice.reducer;