// third-party
import { configureStore } from "@reduxjs/toolkit";

// project import
import reducers from "./reducers";

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const initialState = {};

const store = configureStore(
  {
    reducer: reducers,
  },
  initialState
);

const { dispatch } = store;

export { store, dispatch };
