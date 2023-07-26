import { createSlice } from "@reduxjs/toolkit";

export const userCredentials = createSlice({
  name: "userCredentials",
  initialState: {
    username: "No name",
    id: "sdxfcgvhbjnk",
    title: "No title",
    skills: "No skills",
    hoursRate: "15",
    countryInfo: {
      countryName: "Canada",
      city: "info",
      flag: "🇨🇦",
      time: "",
    },
    email: "dereckdavid@gmail.cx`m",
    phoneNumber: "No phone Number",
    openToCollabrate: false,
    backgroundPicture:"",
    profilePicture:""
  },
  reducers: {
    updateUserData: (state, action) => {
      const {
        username,
        title,
        skills,
        hoursRate,
        countryInfo,
        flag,
        time,
        email,
        phoneNumber,
        openToCollabrate,
        id,
        profilePicture,
        backgroundPicture
      } = action.payload;

      // Update the state with the new values from the payload
      state.username = username;
      state.title = title;
      state.skills = skills;
      state.hoursRate = hoursRate;
      state.countryInfo = countryInfo;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.openToCollabrate = openToCollabrate;
      state.id=id
      state.profilePicture=profilePicture
      state.backgroundPicture=backgroundPicture
    },
    updateUserData2: (state, action) => {
      const {
        username,
        title,
        skills,
        hoursRate,
        countryInfo,
        
        email,
        phoneNumber,
        openToCollabrate,
        
      } = action.payload;

      // Update the state with the new values from the payload
      state.username = username;
      state.title = title;
      state.skills = skills;
      state.hoursRate = hoursRate;
      state.countryInfo = countryInfo;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.openToCollabrate = openToCollabrate;
      
    },
  },
});

export const userActions = userCredentials.actions;
