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
  payableList: null,
  receivableList: null,
  bankList: null,
  userAccountList: null,
  paymentList: null,
  receiptList: null,
  expenseCategoryList: null,
};

// ==============================|| SLICE - MENU ||============================== //

const organizationUserState = createSlice({
  name: "organizationUserState",
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
    setStockListAction(state, action) {
      state.stockList = action.payload.stocksList;
    },
    setPayableListAction(state, action) {
      state.payableList = action.payload.payableList;
    },
    setReceivableListAction(state, action) {
      state.receivableList = action.payload.receivableList;
    },
    setBanksListAction(state, action) {
      state.bankList = action.payload.bankList;
    },
    setUserAccountListAction(state, action) {
      state.userAccountList = action.payload.userAccountList;
    },
    setPaymentListAction(state, action) {
      state.paymentList = action.payload.paymentList;
    },
    setReceiptListAction(state, action) {
      state.receiptList = action.payload.receiptList;
    },
    setExpenseCategoryListAction(state, action) {
      state.expenseCategoryList = action.payload.expenseCategoryList;
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
  setStockListAction,
  setBanksListAction,
  setPayableListAction,
  setReceivableListAction,
  setUserAccountListAction,
  setPaymentListAction,
  setReceiptListAction,
  setExpenseCategoryListAction,
} = organizationUserState.actions;
