// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import authentication from "./authentication";
import adminState from "./admin-state";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, authentication, adminState });

export default reducers;
