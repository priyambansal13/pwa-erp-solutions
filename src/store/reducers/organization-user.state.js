// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  productsList: null,
  salesList: null,
  customersList: null,
  suppliersList: null,
  purchaseList: null,
};

// ==============================|| SLICE - MENU ||============================== //

const organizationUserState = createSlice({
  name: "adminState",
  initialState,
  reducers: {
    setProductsListAction(state, action) {
      state.productsList = action.payload.productsList;
    },
    setCustomersListAction(state, action) {
      state.customersList = action.payload.customersList;
    },
    setSuppliersListAction(state, action) {
      state.suppliersList = action.payload.suppliersList;
    },
    setSalesListAction(state, action) {
      state.salesList = action.payload.salesList;
    },
    setPurchaseListAction(state, action) {
      state.purchaseList = action.payload.purchaseList;
    },
  },
});

export default organizationUserState.reducer;

export const {
  setProductsListAction,
  setCustomersListAction,
  setSuppliersListAction,
  setSalesListAction,
  setPurchaseListAction,
} = organizationUserState.actions;
