import { jwtDecode } from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import {
  getMode,
  getProfileLocalDetails,
  getToken,
  getUserDetails,
} from "../../utils/auth";

const initialState = {
  token: getToken(),
  userDetails: getUserDetails(),
  profileDetails: getProfileLocalDetails(),
  mode: getMode(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      const { access } = action.payload;
      const { username, email, iat, exp, role } = jwtDecode(access);

      state.userDetails = {
        username,
        email,
        issuedTime: iat,
        expiryTime: exp,
        role,
      };

      localStorage.setItem("token", JSON.stringify(state.token));
      const expiration = new Date(exp * 1000);
      expiration.setHours(expiration.getHours());
      localStorage.setItem("expiration", expiration.toISOString());
    },
    logout(state) {
      state.token = null;
      state.userDetails = null;
      state.profileDetails = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("profileDetails");
      localStorage.removeItem("orders");
      localStorage.removeItem("address");
      localStorage.removeItem("selectedAddr");
    },
    profileDetails(state, action) {
      state.profileDetails = action.payload;
      localStorage.setItem("profileDetails", JSON.stringify(action.payload));
    },
    toogleMode(state) {
      let result = state.mode === "dark" ? "light" : "dark";
      state.mode = result;
      console.log(state.mode, state.mode === "dark");
      localStorage.setItem("mode", result);
    },
  },
});

export const { login, logout, profileDetails, toogleMode } = userSlice.actions;
export default userSlice.reducer;
