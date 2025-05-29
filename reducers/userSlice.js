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
    gender: "",
    currentLevelID: "",
    currentSubLevelID: "",
    height: "",
    weight: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      // On fusionne l'ancien state user avec les nouvelles infos reçues du back :
      // Si une clé est absente dans le payload, on garde l'ancienne valeur existante.
      // Ça évite de perdre une info (ex : photoUrl) si le back renvoie un payload incomplet.
      state.value = { ...state.value, ...action.payload };
      console.log(state.value);
    },
    removeUserToStore: (state, action) => {
      state.value = initialState.value;
    },
    updateUser: (state, action) => {
      state.value.currentLevelID = action.payload.currentLevelID;
      state.value.currentSubLevelID = action.payload.currentSubLevelID;
      state.value.xp = action.payload.xp;
      state.value.sessions = action.payload.sessions;
      state.value.playTime = action.payload.playTime;
    },
  },
});

export const { addUserToStore, removeUserToStore, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
