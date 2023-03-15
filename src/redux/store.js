import { confi } from "redux";
import { cartReducer } from "./reducers/cartReducer";

const store = configureStore(cartReducer);

export default store;
