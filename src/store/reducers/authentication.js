// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  authenticationDetails: {
    userRole: null,
    userId: null,
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
    enabled: false,
  },
  userDetails: {},
};

// ==============================|| SLICE - MENU ||============================== //

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthenticationDetails(state, action) {
      state.authenticationDetails = action.payload.authenticationDetails;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload.userDetails;
    },
  },
});

export default authentication.reducer;

export const { setAuthenticationDetails, setUserDetails } =
  authentication.actions;
