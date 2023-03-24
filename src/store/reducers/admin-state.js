// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  rolesList: null,
  organizationList: null,
};

// ==============================|| SLICE - MENU ||============================== //

const adminState = createSlice({
  name: "adminState",
  initialState,
  reducers: {
    setRolesListAction(state, action) {
      state.rolesList = action.payload.rolesList;
    },
    setOrganizationListAction(state, action) {
      state.organizationList = action.payload.organizationList;
    },
  },
});

export default adminState.reducer;

export const { setRolesListAction, setOrganizationListAction } =
  adminState.actions;
