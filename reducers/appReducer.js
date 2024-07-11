import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "David",
  identifier: "",
  followers: 0,
  following: 0,
  email: "",
  password: "",
  profileImage: "",
  gender: "",
  birthdate: "",
  country: "",
  about: "",
};

export const stateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action) => {
      state.password = action.payload;
    },
    setUserGender: (state, action) => {
      state.gender = action.payload;
    },
    setUserBdate: (state, action) => {
      state.birthdate = action.payload;
    },
    setUserCountry: (state, action) => {
      state.country = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setProfile: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserBdate,
  setUserCountry,
  setUserEmail,
  setUserGender,
  setUserName,
  setUserPassword,
  setProfile,
} = stateSlice.actions;

export default stateSlice.reducer;

export const getUserName = (state) => state.appState.userName;

export const getUserMail = (state) => state.appState.email;

export const getUserBDate = (state) => state.appState.birthdate;

export const getUserGender = (state) => state.appState.gender;

export const getUserCountry = (state) => state.appState.country;

export const getUserPassword = (state) => state.appState.password;
export const getUserFollowers = (state) => state.appState.followers;
export const getUserFollowing = (state) => state.appState.following;

export const getAbout = (state) => state.appState.about;
export const getId = (state) => state.appState.identifier;

export const getProfile = (state) => state.appState.profileImage;
