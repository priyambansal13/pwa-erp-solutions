// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  productsList: null,
  salesList: null,
  customersList: null,
  suppliersList: null,
  purchaseList: null,
  stockList: null,
};

// ==============================|| SLICE - MENU ||============================== //

const organizationUserState = createSlice({
  name: "organizationUserState",
  initialState,
  reducers: {
    setProductsForOrganizationListAction(state, action) {
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
    setStockListAction(state, action) {
      state.stockList = action.payload.stocksList;
    },
  },
});

export default organizationUserState.reducer;

export const {
  setProductsForOrganizationListAction,
  setCustomersListAction,
  setSuppliersListAction,
  setSalesListAction,
  setPurchaseListAction,
  setStockListAction,
} = organizationUserState.actions;
