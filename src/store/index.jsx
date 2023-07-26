import { configureStore } from "@reduxjs/toolkit";
import { loggedInSlice } from "./slices/LoggedInSlice";
import { formData } from "./slices/formData";
import { userCredentials } from './slices/userCredentials';
import { aboutSlice } from "./slices/aboutSlice";
import { callSlice } from "./slices/callSlice";

export const store = configureStore({
  reducer: {
    logged: loggedInSlice.reducer,
    formData:formData.reducer,
    userCredentials:userCredentials.reducer,
    aboutData:aboutSlice.reducer,
    callData:callSlice.reducer
  },
});
