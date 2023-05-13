// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  rolesList: null,
  organizationList: null,
  productsList: null,
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
    setOrganizationProductListAction(state, action) {
      state.productsList = action.payload.productsList;
    },
  },
});

export default adminState.reducer;

export const {
  setRolesListAction,
  setOrganizationListAction,
  setOrganizationProductListAction,
} = adminState.actions;
